from django.shortcuts import render



from .models import Bonus
from .serializers import BonusSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# Create your views here.


@api_view(['GET'])
def list_bonus(request):
    if request.method == 'GET':
        try:
            bonus = Bonus.objects.all()
            serailizer = BonusSerializer(bonus, many=True)
            if bonus is None:
                return Response({'message': 'No bonus found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(serailizer.data, status=status.HTTP_200_OK)
        except Bonus.DoesNotExist:
            return Response({'message': 'Bonus not found'}, status=status.HTTP_404_NOT_FOUND)




@api_view(['POST'])
def create_bonus(request):
    if request.method == 'POST':
        serializer = BonusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'messgae': 'Bonus created successfully'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'messgae': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def bonus(request, pk):
    if request.method == 'GET':
        try:
            bonus = Bonus.objects.get(pk=pk)
        except Bonus.DoesNotExist:
            return Response({'message': 'Bonus not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = BonusSerializer(bonus)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


@api_view(['PUT', 'DELETE', 'GET'])
def update_bonus(request, pk):
    try:
        bonus = Bonus.objects.get(pk=pk)
    except Bonus.DoesNotExist:
        return Response({'message': 'Bonus not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = BonusSerializer(bonus, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        bonus.delete()
        return Response({'message': 'Bonus deleted successfully'}, status=status.HTTP_202_ACCEPTED)
    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
