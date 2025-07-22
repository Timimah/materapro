from rest_framework import serializers
from ..models import Listing
from suppliers.models import SupplierProfile as Supplier
from ..models import Category


class ListingCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            "id",
            "title",
            "description",
            "type",
            "price",
            "category",
            "image",
            "stock_quantity",
            "is_active",
        ]
        read_only_fields = ["id", "is_active"]

    def validate_type(self, value):
        if value != "PRODUCT":
            raise serializers.ValidationError(
                "Only product listings are allowed at this time."
            )
        return value


class CategorySimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "parent"]


class SupplierSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ["id", "business_name", "location"]


class ListingDetailSerializer(serializers.ModelSerializer):
    category = CategorySimpleSerializer(read_only=True)
    supplier = SupplierSimpleSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = [
            "id",
            "title",
            "description",
            "price",
            "category",
            "supplier",
            "image",
            "stock_quantity",
            "is_active",
        ]
        read_only_fields = ["id", "is_active"]


class ListingListSerializer(serializers.ModelSerializer):
    category = CategorySimpleSerializer(read_only=True)
    supplier = SupplierSimpleSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = [
            "id",
            "title",
            "price",
            "supplier",
            "category",
            "image",
        ]
        read_only_fields = ["id"]
