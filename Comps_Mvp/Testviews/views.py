from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from accounts.permission import IsAdmin, IsCompany, IsEmployee, IsTrader


from permissions.permissions import user_role_required

# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def test(request):
    return Response({'message': 'You are an admin'})

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsEmployee])
@user_role_required(roles=["Employee"])
def test2(request):
    return Response({'message': 'You are an employee'})
