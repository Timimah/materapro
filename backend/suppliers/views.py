from rest_framework import generics, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, NotFound
from .models import SupplierProfile
from rest_framework.response import Response
from .serializers import SupplierProfileSerializer
from drf_spectacular.utils import extend_schema


class IsSupplier(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "SUPPLIER"

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


@extend_schema(
    tags=["Supplier"],
    summary="Supplier Profile Management",
    description="Manage supplier profiles including creating, viewing and updating profile information.",
    responses={
        status.HTTP_200_OK: SupplierProfileSerializer,
    },
)
class SupplierProfileView(generics.GenericAPIView):
    serializer_class = SupplierProfileSerializer
    permission_classes = [IsSupplier]

    def get_object(self):
        try:
            return self.request.user.supplier_profile
        except SupplierProfile.DoesNotExist:
            raise NotFound("Supplier profile not found.")

    def get(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        if hasattr(request.user, "supplier_profile"):
            raise PermissionDenied("You already have a supplier profile.")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.save(user=request.user)
        return Response(
            SupplierProfileSerializer(profile).data, status=status.HTTP_201_CREATED
        )

    def patch(self, request, *args, **kwargs):
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
