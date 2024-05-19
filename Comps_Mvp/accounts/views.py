from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import NewUser
from .serializers import CustomUserSerializer
import logging

class UserCreate(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserUpdate(APIView):
    def put(self, request, *args, **kwargs):
        user = NewUser.objects.get(pk=request.user.pk)
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfile(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

logger = logging.getLogger(__name__)

class BlacklistTokenUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logger.info('Received request data: %s', request.data)
            refresh_token = request.data.get("refresh_token")
            if refresh_token is None:
                logger.error('No refresh_token in request data')
                return Response({"error": "refresh_token is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            logger.exception('Exception while blacklisting token')
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)