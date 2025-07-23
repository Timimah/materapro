import django_filters
from .models import Listing


class ListingFilter(django_filters.FilterSet):
    """
    Filter for Listing model to allow filtering by various fields.
    """

    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    in_stock = django_filters.BooleanFilter(method="filter_in_stock")
    category = django_filters.NumberFilter(field_name="category__id")
    supplier = django_filters.NumberFilter(field_name="supplier__id")
    parent_category = django_filters.NumberFilter(field_name="category__parent__id")

    class Meta:
        model = Listing
        fields = [
            "category",
            "supplier",
            "parent_category",
            "min_price",
            "max_price",
            "in_stock",
        ]

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock_quantity__gt=0)
        return queryset
