from rest_framework import generics, status
from drf_spectacular.utils import extend_schema
from drf_spectacular.types import OpenApiTypes
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.exceptions import NotFound
from core.permissions import IsSupplierOrReadOnly, IsOwnerOrReadOnly
from ..models import Listing
from ..filters import ListingFilter
from ..serializers.listing import (
    ListingCreateUpdateSerializer,
    ListingDetailSerializer,
    ListingListSerializer,
)


@extend_schema(
    tags=["Listings"],
    summary="List and create listings",
    description="Public can list. Only suppliers can create listings.",
    responses={
        status.HTTP_200_OK: ListingDetailSerializer(many=True),
        status.HTTP_201_CREATED: ListingDetailSerializer,
    },
)
class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.filter(is_active=True).select_related(
        "category", "supplier"
    )
    permission_classes = [IsSupplierOrReadOnly]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ListingFilter
    search_fields = ["title"]
    ordering_fields = ["price", "updated_at", "created_at"]
    ordering = ["-updated_at"]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ListingListSerializer
        return ListingCreateUpdateSerializer

    def perform_create(self, serializer):
        try:
            supplier_profile = self.request.user.supplier_profile
        except AttributeError:
            from rest_framework.exceptions import ValidationError

            raise ValidationError("User does not have a supplier profile.")
        serializer.save(supplier=supplier_profile)


@extend_schema(
    tags=["Listings"],
    summary="Retrieve, update, or delete a listing",
    description="Suppliers can update or delete their own listings. Public can retrieve listings.",
    responses={
        status.HTTP_200_OK: ListingDetailSerializer,
        status.HTTP_204_NO_CONTENT: None,
        status.HTTP_404_NOT_FOUND: OpenApiTypes.STR,
    },
)
class ListingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Listing.objects.all().select_related("category", "supplier")

    def get_object(self):
        listing = super().get_object()
        if not listing.is_active and self.request.method == "GET":
            raise NotFound("Listing is not active.")
        return listing

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return ListingCreateUpdateSerializer
        return ListingDetailSerializer

    def perform_update(self, serializer):
        try:
            supplier_profile = self.request.user.supplier_profile
        except AttributeError:
            from rest_framework.exceptions import ValidationError

            raise ValidationError("User does not have a supplier profile.")
        serializer.save(supplier=supplier_profile)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
