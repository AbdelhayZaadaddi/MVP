from .models import NewUser
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer class for the User model.

    This serializer is used to convert User model instances into JSON
    representations and vice versa. It specifies the fields that should be
    included in the serialized output and provides a custom create method
    for creating new User instances.

    Attributes:
        model (class): The User model class.
        fields (list): The fields to include in the serialized output.

    Methods:
        create(validated_data): Creates a new User instance based on the
            validated data.

    """

    class Meta:
        model = NewUser
        fields = ['user_name', 'email', 'password']

    def create(self, validated_data):
        """
        Create a new instance of the model with the provided validated data.

        Args:
            validated_data (dict): The validated data for creating the instance.

        Returns:
            instance: The created instance of the model.
        """
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.is_active = True # Set the user to active
        instance.save()
        print(f"Hashed password when creating user: {instance.password}")  # Print the hashed password
        return instance
