# create the permissions to check the role of the user
from .models import NewUser
from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Custom permission class that checks if the user has admin role.
    """

    def has_permission(self, request, view):
        """
        Check if the user has admin role.

        Args:
            request (HttpRequest): The request object.
            view (View): The view object.

        Returns:
            bool: True if the user has admin role, False otherwise.
        """
        return request.user.role == NewUser.Role.ADMIN


class IsEmployee(BasePermission):
    """
    Custom permission class that checks if the user is an employee.
    """

    def has_permission(self, request, view):
        """
        Checks if the user has permission to access the specified view.

        Args:
            request (HttpRequest): The request object.
            view (View): The view object.

        Returns:
            bool: True if the user has permission, False otherwise.
        """
        return request.user.role == NewUser.Role.EMPLOYEE


class IsCompany(BasePermission):
    """
    Custom permission class that checks if the user is an company.
    """
    def has_permission(self, request, view):
        """
        Checks if the user has permission to access the specified view.

        Args:
            request (HttpRequest): The request object.
            view (View): The view object.

        Returns:
            bool: True if the user has permission, False otherwise.
        """
        return request.user.role == NewUser.Role.COMPANY


class IsTrader(BasePermission):
    """
    Custom permission class that checks if the user is an Trader.
    """
    def has_permission(self, request, view):
        """
        Checks if the user has permission to access the specified view.

        Args:
            request (HttpRequest): The request object.
            view (View): The view object.

        Returns:
            bool: True if the user has permission, False otherwise.
        """
        return request.user.role == NewUser.Role.TRADER
