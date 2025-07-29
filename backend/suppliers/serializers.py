from rest_framework.serializers import ModelSerializer
from .models import SupplierProfile


class SupplierProfileSerializer(ModelSerializer):
    class Meta:
        model = SupplierProfile
        fields = [
            "business_name",
            "bio",
            "website",
            "logo",
            "state",
            "city",
            "location",
            "is_verified",
            "created_at",
            "updated_at",
        ]

        read_only_fields = ["is_verified", "created_at", "updated_at"]
