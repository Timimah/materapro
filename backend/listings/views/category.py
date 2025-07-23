from rest_framework import generics
from ..models import Category
from ..serializers import CategorySerializer
from core.permissions import IsAdminOrReadOnly
from drf_spectacular.utils import extend_schema


@extend_schema(
    tags=["Category"],
    summary="Category List Management",
    description="Manage categories lists. This includes creating new categories and retrieving a list of existing categories.",
    responses={
        200: CategorySerializer,
        201: CategorySerializer,
        204: None,
    },
)
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]


@extend_schema(
    tags=["Category"],
    summary="Category Management",
    description="Manage categories including retrieving, updating, and deleting categories.",
    responses={
        200: CategorySerializer,
        201: CategorySerializer,
        204: None,
    },
)
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    http_method_names = ["get", "patch", "delete"]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
