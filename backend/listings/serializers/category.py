from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from ..models import Category


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]
        depth = 2


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "description", "parent", "subcategories"]

    @extend_schema_field(SubCategorySerializer(many=True))
    def get_subcategories(self, obj):
        children = obj.subcategories.all()
        return SubCategorySerializer(children, many=True).data
