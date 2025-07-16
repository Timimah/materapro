from .serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import GenericAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenBlacklistView,
    TokenRefreshView,
)
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model

User = get_user_model()


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@extend_schema(
    tags=["Auth"],
    summary="Register a new user",
    description="Creates a new user with role-based access. Requires email, password, and role.",
    request=RegisterSerializer,
    responses={201: RegisterSerializer},
)
class RegisterView(GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        tokens = get_tokens_for_user(user)

        return Response(
            {"user": serializer.data, "tokens": tokens}, status=status.HTTP_201_CREATED
        )


@extend_schema(
    tags=["User"],
    summary="Retrieve and edit user details",
    description="Retrieve and edit user information.",
    request=RegisterSerializer,
    responses={201: RegisterSerializer},
)
class UserDetailsView(GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save() # Remove password, role and email from update
        return Response(serializer.data)


@extend_schema(
    tags=["Auth"],
    summary="Log in",
    description="Returns JWT access and refresh tokens for valid credentials.",
)
class LoginView(TokenObtainPairView):
    """
    Endpoint to log users in."""

    pass


@extend_schema(
    tags=["Auth"],
    summary="Log out",
    description="Blacklists JWT refresh tokens.",
)
class LogoutView(TokenBlacklistView):
    """
    Endpoint to log out a user by blacklisting their refresh token.
    """

    pass


@extend_schema(
    tags=["Auth"],
    summary="Refresh token",
    description="Refreshes JWT access tokens for valid credentials.",
)
class RefreshView(TokenRefreshView):
    """
    Endpoint to refresh access token
    """

    pass
