from rest_framework import serializers
from .models import Product



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__' 

# ------------------------------ Simple serializers-------------------
# class ProductSerializer(serializers.Serializer):
#    id = serializers.IntegerField(read_only=True)
#    name = serializers.CharField(max_length=100)
#    price = serializers.DecimalField(max_digits=10, decimal_places=2)
#    description = serializers.CharField(max_length=255)
#    created_at = serializers.DateTimeField(read_only=True)
#    updated_at = serializers.DateTimeField(read_only=True)
#    is_active = serializers.BooleanField(read_only=True)
#    is_delated = serializers.BooleanField(read_only=True)


 #   def create(self, validated_data):
  #      return Product.objects.create(**validated_data)
    
#    def update(self, instance, validated_data):
#        instance.name = validated_data.get('name', instance.name)
#        instance.price = validated_data.get('price', instance.price)
#        instance.description = validated_data.get('description', instance.description)
#        instance.updated_at = validated_data.get('updated_at', instance.updated_at)
#        instance.is_active = validated_data.get('is_active', instance.is_active)
  #      instance.save()
 #       return instance