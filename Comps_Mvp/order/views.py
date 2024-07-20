from django.shortcuts import render
from products.models import Product
from .models import Order, OrderItem, OrderStatus
from rest_framework.response import Response
from .serializers import OrderItemSerializer, OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from accounts.permission import IsAdmin
from rest_framework.pagination import PageNumberPagination

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_order(request):
    data = request.data
    orderitems = data.get('orderitems', [])
    if not orderitems:
        return Response({'message': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with transaction.atomic():
            total = sum([i['quantity'] * Product.objects.get(id=i['product']).price for i in orderitems])
            order = Order.objects.create(
                user=request.user,
                city=data['city'],
                street=data['street'],
                address=data['address'],
                phone=data['phone'],
                total=total
            )
            for i in orderitems:
                product = Product.objects.get(id=i['product'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=i['quantity'],
                    price=product.price * i['quantity']
                )
        return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'message': 'An error occurred while creating the order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10  # You can also set this value dynamically

    orders = Order.objects.filter(user=request.user).prefetch_related('orderitems')
    result_page = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request, pk):
    try:
        order = Order.objects.prefetch_related('orderitems').get(pk=pk, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order(request, pk):
    try:
        order = Order.objects.get(pk=pk, user=request.user)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = OrderSerializer(order, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, pk):
    try:
        order = Order.objects.get(pk=pk, user=request.user)
        order.delete()
        return Response({'message': 'Order deleted successfully'}, status=status.HTTP_202_ACCEPTED)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

