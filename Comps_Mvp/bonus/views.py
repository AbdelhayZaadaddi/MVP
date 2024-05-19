from .models import Bonus
from .serializers import BonusSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
# Create your views here.


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def bonus_list_create(request):
    if request.method == 'GET':
        try:
            bonus = Bonus.objects.all()
            serailizer = BonusSerializer(bonus, many=True)
            if bonus is None:
                return Response({'message': 'No bonus found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(serailizer.data, status=status.HTTP_200_OK)
        except Bonus.DoesNotExist:
            return Response({'message': 'Bonus not found'}, status=status.HTTP_404_NOT_FOUND)
        
    elif request.method == 'POST':
        serailizer = BonusSerializer(data=request.data, context={'request': request})
        if serailizer.is_valid():
            serailizer.save()
            return Response(serailizer.data, status=status.HTTP_201_CREATED)
        return Response(serailizer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def bonus_detail_update_delete(request, pk):
    bonus = get_object_or_404(Bonus, pk=pk)

    if request.method == 'GET':
        serializer = BonusSerializer(bonus, context={'request': request})
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = BonusSerializer(bonus, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        bonus.delete()
        return Response({'message': 'Bonus deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
