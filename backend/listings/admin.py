from django.contrib import admin
from .models import Category, Listing


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "parent", "created_at")
    list_filter = ("parent",)
    search_fields = ("name",)
    ordering = ("name",)
    readonly_fields = ("created_at", "updated_at")

    fieldsets = (
        (None, {"fields": ("name", "description", "parent")}),
        (
            "Timestamps",
            {
                "fields": ("created_at", "updated_at"),
            },
        ),
    )


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ("title", "supplier", "category", "price", "is_active", "created_at")
    list_filter = ("is_active", "category", "created_at")
    search_fields = ("title", "description", "supplier__business_name")
    readonly_fields = ("created_at", "updated_at")
