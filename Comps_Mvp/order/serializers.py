from rest_framework import serializers
from .models import OrderItem, Order

class OrderItmeSerializer(serializers.ModelSerializer):
    """
    Serializer for the OrderItem model.
    """
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Order model.
    """
    orderitems = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderitems(self, obj):
        """
        Method to get the orderitems for the Order.
        """
        orderitems = obj.orderitems.all()
        return OrderItmeSerializer(orderitems, many=True).data  # Fix the typo in the class name