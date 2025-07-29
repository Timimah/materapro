from django.urls import path
from .views import RegisterView, UserDetailsView, LoginView, LogoutView, RefreshView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("token/refresh/", RefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", UserDetailsView.as_view(), name="user_details"),
]
