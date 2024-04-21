from django.shortcuts import render
from products.models import Product
from .models import Order, OrderItem, OrderStatus
from django.http import JsonResponse
from rest_framework.response import Response
from .serializers import OrderItmeSerializer, OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_order(request):
    """
    Create a new order.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: The HTTP response object.

    Raises:
        None

    """
    data = request.data
    orderitems = data['orderitems']
    if orderitems and len(orderitems) == 0:
        return Response({'message': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. Create Order
        order = Order.objects.create(
            user=request.user,
            city=data['city'],
            street=data['street'],
            address=data['address'],
            phone=data['phone'],
            total=data['total']
        )
        # 2. Create Order Items
        for i in orderitems:
            product = Product.objects.get(id=i['product'])
            order_item = OrderItem.objects.create(
                order=order,
                product=product,
                quantity=i['quantity'],
                price=i['price']
            )
        return Response({'message': 'Order created successfully'}, status=status.HTTP_201_CREATED)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    """
    Get all orders.

    Args:
        request (HttpRequest): The HTTP request object.

    Returns:
        Response: The HTTP response object.

    Raises:
        None

    """
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request, pk):
    """
    Get a specific order.

    Args:
        request (HttpRequest): The HTTP request object.
        pk (int): The primary key of the order.

    Returns:
        Response: The HTTP response object.

    Raises:
        None

    """
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order(request, pk):
    """
    Update an order.

    Args:
        request (HttpRequest): The HTTP request object.
        pk (int): The primary key of the order.

    Returns:
        Response: The HTTP response object.

    Raises:
        None

    """
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_order(request, pk):
    """
    Delete an order.

    Args:
        request (HttpRequest): The HTTP request object.
        pk (int): The primary key of the order.

    Returns:
        Response: The HTTP response object.

    Raises:
        None

    """
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response({'message': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    order.delete()
    return Response({'message': 'Order deleted successfully'}, status=status.HTTP_202_ACCEPTED)



