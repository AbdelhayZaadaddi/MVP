from rest_framework import serializers
from django.contrib.auth.models import User

class SingUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username','email', 'password')

        extra_kwargs = {
            'first_name':{'required':True, 'allow_blank':False},
            'last_name':{'required':True, 'allow_blank':False},
            'username':{'required':True, 'allow_blank':False},
            'email':{'required':True, 'allow_blank':False},
            'password':{'required':True, 'allow_blank':False},
        }


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')