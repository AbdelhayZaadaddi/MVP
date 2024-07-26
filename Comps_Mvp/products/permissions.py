from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        if request.methof in permissions.SAFE_METHODS:
            return True
        else:
            return request.user and request.user.is_staff
        
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return obj.owner == request.user
    