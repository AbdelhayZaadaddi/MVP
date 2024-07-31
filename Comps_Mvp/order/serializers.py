from rest_framework import serializers
from .models import OrderItem, Order

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


class OrderStatisticsSerializer(serializers.Serializer):
    total_orders = serializers.IntegerField()
    total_items = serializers.IntegerField()
    total_income = serializers.DecimalField(max_digits=10, decimal_places=2)
    
    today = serializers.DictField()
    this_week = serializers.DictField()
    this_month = serializers.DictField()