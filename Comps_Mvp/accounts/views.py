from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import NewUser
from .serailizers import UserSerializer

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
    return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)