from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer


class CustomRegisterView(RegisterView):
    """
    Custom registration view to handle user registration with additional fields.
    """

    serializer_class = CustomRegisterSerializer
