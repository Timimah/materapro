from django.db import models
from django.conf import settings


class SupplierProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="supplier_profile",
    )
    business_name = models.CharField(max_length=225)
    bio = models.TextField(blank=True)
    website = models.URLField(blank=True)
    logo = models.ImageField(upload_to="suppliers/logos/", blank=True, null=True)
    state = models.CharField(max_length=225)
    city = models.CharField(max_length=225)
    location = models.CharField(max_length=225, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.business_name} ({self.user.get_full_name()})"
