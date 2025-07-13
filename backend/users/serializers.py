from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"},
        help_text="Password for the user account.",
    )
    email = serializers.EmailField(
        required=True,
        help_text="Email address of the user.",
    )
    first_name = serializers.CharField(
        required=True,
        help_text="First name of the user.",
    )
    last_name = serializers.CharField(
        required=True,
        help_text="Last name of the user.",
    )

    role = serializers.ChoiceField(
        required=True,
        choices=[("CLIENT", "Client"), ("SUPPLIER", "Supplier")],
        help_text="Role of the user in the system.",
    )

    class Meta:
        model = User
        fields = ("email", "first_name", "last_name", "password", "role")

    def create(self, validated_data):
        user = User(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            role=validated_data["role"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
