from rest_framework import permissions


class IsSupplier(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "SUPPLIER"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
