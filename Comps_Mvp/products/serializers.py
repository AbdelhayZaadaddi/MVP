# products/serializers.py
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


