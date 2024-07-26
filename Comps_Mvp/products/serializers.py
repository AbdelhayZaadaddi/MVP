from rest_framework import serializers
from .models import Product, Company, City

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    city_name = serializers.CharField(source='city.name', required=False)
    company_name = serializers.CharField(source='company.name', required=False)
    city = serializers.CharField(write_only=True, required=False)
    company = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

    def create(self, validated_data):
        city_name = validated_data.pop('city', None)
        company_name = validated_data.pop('company', None)

        if city_name:
            city, created = City.objects.get_or_create(name=city_name)
            validated_data['city'] = city

        if company_name:
            company, created = Company.objects.get_or_create(name=company_name)
            validated_data['company'] = company

        image = validated_data.pop('image', None)
        product = Product.objects.create(**validated_data)

        if image:
            product.image = image
            product.save()

        return product

    def update(self, instance, validated_data):
        city_name = validated_data.pop('city', None)
        company_name = validated_data.pop('company', None)

        if city_name:
            instance.city, created = City.objects.get_or_create(name=city_name)

        if company_name:
            instance.company, created = Company.objects.get_or_create(name=company_name)

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.category = validated_data.get('category', instance.category)
        instance.image = validated_data.get('image', instance.image)
        instance.save()

        return instance
