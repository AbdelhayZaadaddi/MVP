from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response

from rest_framework import status
from .models import Product, City, Company, ProductReview
from .serializers import ProductSerializer, ProductReviewSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.shortcuts import get_list_or_404
import logging

from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from order.models import OrderItem
from django.db.models import Count

from notification.models import Notification
from django.conf import settings
from django.contrib.auth import get_user_model

from django.utils.timezone import localtime
from accounts.models import NewUser



logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_products(request):
    user = request.user

    # Log using the correct field
    logger.info(f"User: {user.user_name}, Role: {user.role}")

    # Check user's role and filter products accordingly
    if user.role == NewUser.Role.ADMIN:
        products = Product.objects.all()
    elif user.role == NewUser.Role.TRADER:
        products = Product.objects.filter(created_by=user)
    else:
        # Unauthorized role
        logger.warning("User does not have the required role")
        return Response({'detail': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)

    # Serialize and return the products
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def available_categories(request):
    categories = [category[0] for category in Product.CATEGORY_CHOICES]
    return Response(categories)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def available_cities(request):
    cities = City.objects.all().values_list('name', flat=True)
    return Response(cities)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def available_companies(request):
    companies = Company.objects.all().values_list('name', flat=True)
    return Response(companies)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def product_list_create(request):
    paginator = PageNumberPagination()
    paginator.page_size = 12
    if request.method == 'GET':
        category = request.GET.get('category')
        city_name = request.GET.get('city_name')
        company_name = request.GET.get('company_name')

        filters = Q()
        if category:
            filters &= Q(category=category)
        if city_name:
            filters &= Q(city__name=city_name)
        if company_name:
            filters &= Q(company__name=company_name)

        products = Product.objects.filter(filters).order_by('-created_at')
        result_page = paginator.paginate_queryset(products, request)
        serializer = ProductSerializer(result_page, many=True, context={'request': request})
        return Response(serializer.data)
    

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            product = serializer.save(created_by=request.user)

            # Optionally, call a function to create notifications
            create_product_notifications(product, request.user)
            # Return the serialized data for the created product
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
        
        # Return errors if serializer is not valid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def products_list(request):
    paginator = PageNumberPagination()
    paginator.page_size = 12
    category = request.GET.get('category')
    city_name = request.GET.get('city_name')
    company_name = request.GET.get('company_name')

    filters = Q()
    if category:
        filters &= Q(category=category)
    if city_name:
        filters &= Q(city__name=city_name)
    if company_name:
        filters &= Q(company__name=company_name)

    products = Product.objects.filter(filters).order_by('-created_at')
    result_page = paginator.paginate_queryset(products, request)
    serializer = ProductSerializer(result_page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)
    


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def product_detail_update_delete(request, pk):
    product = get_object_or_404(Product, pk=pk)

    if request.method == 'GET':
        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response({'message': 'Product deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_product_reviews(request, pk):
    product = get_object_or_404(Product, pk=pk)
    reviews = product.reviews.all()
    serializer = ProductReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_product_review(request, pk):
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(product=product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def product_review_detail_update_delete(request, pk):
    review = get_object_or_404(ProductReview, pk=pk)

    if request.method == 'GET':
        serializer = ProductReviewSerializer(review)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductReviewSerializer(review, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        review.delete()
        return Response({'message': 'Review deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trending_products(request):
    trending_products = Product.objects.annotate(order_count=Count('orderitem')).order_by('-order_count')[:10]

    serializer = ProductSerializer(trending_products, many=True, context={'request': request})

    return Response(serializer.data)



def create_product_notifications(product, request_user):
    User = get_user_model()
    companies = User.objects.filter(role='company')
    employees = User.objects.filter(role='employee')
    admins = User.objects.filter(role='admin')

    # Combine querysets
    recipients = companies | employees | admins
    


    # Create notifications
    for user in recipients:
        message = (
            f"New Offer : {product.name}\n"
            f" - By: {request_user.user_name}\n"
        )
        Notification.objects.create(
            user=user,
            message=message,
            is_read=False
        )
                
