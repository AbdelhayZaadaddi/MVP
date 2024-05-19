from rest_framework import serializers
from .models import NewUser

class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    password_confirm = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password', 'password_confirm', 'role')
        extra_kwargs = {
            'password': {'write_only': True},
            'password_confirm': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        validated_data.pop('password_confirm', None)
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
