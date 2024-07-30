from rest_framework import serializers
from .models import OrderItem, Order, OrdersStatistics

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderitems = OrderItemSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = Order
        fields = '__all__'

class OrdersStatisticsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdersStatistics
        fields = '__all__'
