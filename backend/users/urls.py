from django.contrib import admin
from django.urls import path, include
from users.views import CustomRegisterView

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("register/", CustomRegisterView.as_view(), name="custom_register"),
]
