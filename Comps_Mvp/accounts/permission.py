# create the permissions to check the role of the user
from .models import NewUser
from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == NewUser.Role.ADMIN


class IsEmployee(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == NewUser.Role.EMPLOYEE


class IsCompany(BasePermission):
   
    def has_permission(self, request, view):
        return request.user.role == NewUser.Role.COMPANY


class IsTrader(BasePermission):
    
    def has_permission(self, request, view):
        return request.user.role == NewUser.Role.TRADER


class IsAdminOrCompany(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is an admin or a company
        return request.user.role in [NewUser.Role.ADMIN, NewUser.Role.COMPANY]
    
class IsAdminOrTrader(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in [NewUser.Role.ADMIN, NewUser.Role.TRADER]