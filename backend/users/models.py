from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model that extends Django's AbstractUser.
    """

    ROLE_CHOICES = (
        ("CLIENT", "Client"),
        ("SUPPLIER", "Supplier"),
    )
    role = models.CharField(
        max_length=15,
        choices=ROLE_CHOICES,
        help_text="Role of the user in the system.",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
    )
    is_verified = models.BooleanField(
        default=False,
        help_text="Designates whether this user has verified their email address.",
    )

    def __str__(self):
        return f"{self.username} ({self.role})"
