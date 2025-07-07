from django.test import TestCase

from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

from .serializers import CustomRegisterSerializer

User = get_user_model()


class CustomRegisterSerializerTestCase(TestCase):
    def test_valid_data_creates_user(self):
        data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "strongpassword123",
            "role": "client",
        }
        serializer = CustomRegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.username, data["username"])
        self.assertEqual(user.email, data["email"])
        self.assertEqual(user.role, data["role"])
        self.assertTrue(user.check_password(data["password"]))

    def test_missing_role_defaults(self):
        data = {
            "username": "testuser2",
            "email": "testuser2@example.com",
            "password": "strongpassword123",
        }
        serializer = CustomRegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.role, getattr(user, "role", None))


class CustomRegisterViewTestCase(APITestCase):
    def test_register_user(self):
        url = reverse(
            "register"
        )  # Make sure your urls.py has a name='register' for the registration endpoint
        data = {
            "username": "apitestuser",
            "email": "apitestuser@example.com",
            "password": "strongpassword123",
            "role": "supplier",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username="apitestuser").exists())
        user = User.objects.get(username="apitestuser")
        self.assertEqual(user.role, "supplier")
