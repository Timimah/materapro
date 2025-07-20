from rest_framework import permissions


class IsSupplier(permissions.BasePermission):
    """Custom permission to only allow suppliers to access their own profile."""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "SUPPLIER"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit an object.
    Non-admin users can only read the object.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_staff
