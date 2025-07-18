from django.contrib import admin
from .models import SupplierProfile


@admin.register(SupplierProfile)
class SupplierProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "business_name", "is_verified", "created_at")
    search_fields = ("user__email", "business_name")
