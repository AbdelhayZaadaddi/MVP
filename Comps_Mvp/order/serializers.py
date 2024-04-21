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
    orderitems = serializers.SerializerMethodField(many=True, read_only=True, method_name='get_orderitems')

    class Meta:
        model = Order
        fields = '__all__'


    def get_orderitems(self, obj):
        """
        Method to get the orderitems for the Order.
        """
        orderitems = obj.orderitems.all()
        serializer = OrderItmeSerializer(orderitems, many=True)
        return serializer.data