from django.urls import path, include
from .views import SupplierProfileView


urlpatterns = [
    path("me/", SupplierProfileView.as_view(), name="supplier_profile"),
]
