from django.db import models
from .category import Category
from suppliers.models import SupplierProfile as Supplier


class Listing(models.Model):
    TYPE_CHOICES = [
        ("PRODUCT", "Product"),
        ("SERVICE", "Service"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=15, choices=TYPE_CHOICES, default="PRODUCT")
    price = models.DecimalField(
        max_digits=10, decimal_places=2, help_text="Price in Naira (₦)"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="listings"
    )
    supplier = models.ForeignKey(
        Supplier, on_delete=models.CASCADE, related_name="listings"
    )
    image = models.ImageField(upload_to="listings/images/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    stock_quantity = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
