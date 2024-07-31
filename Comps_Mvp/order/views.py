from django.shortcuts import render
from products.models import Product
from .models import Order, OrderItem, OrderStatus
from rest_framework.response import Response
from .serializers import OrderItemSerializer, OrderSerializer, OrderStatisticsSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from accounts.permission import IsAdmin, IsAdminOrTrader, IsAdminOrCompany
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum

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
@permission_classes([IsAdminOrTrader])
def get_orders(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10  # You can also set this value dynamically

    orders = Order.objects.filter(user=request.user).prefetch_related('orderitems')
    result_page = paginator.paginate_queryset(orders, request)
    serializer = OrderSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminOrTrader])
def get_order(request, pk):
    try:
        order = Order.objects.prefetch_related('orderitems').get(pk=pk, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAdminOrTrader])
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
@permission_classes([IsAdminOrTrader])
def delete_order(request, pk):
    try:
        order = Order.objects.get(pk=pk, user=request.user)
        order.delete()
        return Response({'message': 'Order deleted successfully'}, status=status.HTTP_202_ACCEPTED)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_statistics(request):
    now = timezone.now()
    
    # Today
    start_today = now.replace(hour=0, minute=0, second=0, microsecond=0)
    end_today = now.replace(hour=23, minute=59, second=59, microsecond=999999)
    
    # This week
    start_week = now - timedelta(days=now.weekday())
    end_week = start_week + timedelta(days=6)
    start_week = start_week.replace(hour=0, minute=0, second=0, microsecond=0)
    end_week = end_week.replace(hour=23, minute=59, second=59, microsecond=999999)
    
    # This month
    start_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    end_month = now.replace(day=1, hour=23, minute=59, second=59, microsecond=999999)
    next_month = start_month + timedelta(days=32)
    start_next_month = next_month.replace(day=1)
    end_month = start_next_month - timedelta(seconds=1)
    
    # All time
    total_orders = Order.objects.filter(user=request.user).count()
    total_items = OrderItem.objects.filter(order__user=request.user).aggregate(total_quantity=Sum('quantity'))['total_quantity']
    total_income = Order.objects.filter(user=request.user).aggregate(total_income=Sum('total'))['total_income']
    
    # Today
    total_orders_today = Order.objects.filter(user=request.user, created_at__range=(start_today, end_today)).count()
    total_items_today = OrderItem.objects.filter(order__user=request.user, order__created_at__range=(start_today, end_today)).aggregate(total_quantity=Sum('quantity'))['total_quantity']
    total_income_today = Order.objects.filter(user=request.user, created_at__range=(start_today, end_today)).aggregate(total_income=Sum('total'))['total_income']
    
    # This week
    total_orders_week = Order.objects.filter(user=request.user, created_at__range=(start_week, end_week)).count()
    total_items_week = OrderItem.objects.filter(order__user=request.user, order__created_at__range=(start_week, end_week)).aggregate(total_quantity=Sum('quantity'))['total_quantity']
    total_income_week = Order.objects.filter(user=request.user, created_at__range=(start_week, end_week)).aggregate(total_income=Sum('total'))['total_income']
    
    # This month
    total_orders_month = Order.objects.filter(user=request.user, created_at__range=(start_month, end_month)).count()
    total_items_month = OrderItem.objects.filter(order__user=request.user, order__created_at__range=(start_month, end_month)).aggregate(total_quantity=Sum('quantity'))['total_quantity']
    total_income_month = Order.objects.filter(user=request.user, created_at__range=(start_month, end_month)).aggregate(total_income=Sum('total'))['total_income']
    
    data = {
        'total_orders': total_orders,
        'total_items': total_items,
        'total_income': total_income,
        'today': {
            'total_orders': total_orders_today,
            'total_items': total_items_today,
            'total_income': total_income_today,
        },
        'this_week': {
            'total_orders': total_orders_week,
            'total_items': total_items_week,
            'total_income': total_income_week,
        },
        'this_month': {
            'total_orders': total_orders_month,
            'total_items': total_items_month,
            'total_income': total_income_month,
        }
    }
    
    serializer = OrderStatisticsSerializer(data)
    return Response(serializer.data, status=status.HTTP_200_OK)

