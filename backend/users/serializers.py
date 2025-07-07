from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers


class CustomRegisterSerializer(RegisterSerializer):
    """
    Custom registration serializer to include additional fields.
    """

    role = serializers.ChoiceField(
        choices=[("CLIENT", "Client"), ("SUPPLIER", "Supplier")],
        help_text="Role of the user in the system.",
    )

    def get_cleaned_data(self):
        """
        Override to include the role field in the cleaned data.
        """
        data = super().get_cleaned_data()
        data["role"] = self.validated_data.get("role")
        return data
