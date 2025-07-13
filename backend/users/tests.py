from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

from .serializers import RegisterSerializer

User = get_user_model()


class RegisterSerializerTestCase(APITestCase):
    def test_valid_data_creates_user(self):
        data = {
            "first_name": "Test_1",
            "last_name": "User",
            "email": "testuser@example.com",
            "password": "strongpassword123",
            "role": "CLIENT",
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertIsNotNone(user)
        self.assertEqual(user.email, data["email"])
        self.assertTrue(user.check_password(data["password"]))

    def test_missing_fields_fails(self):
        data = {
            "email": "fail@example.com",
            "password": "12345678",
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("first_name", serializer.errors)
        self.assertIn("last_name", serializer.errors)
        self.assertIn("role", serializer.errors)


class AuthFlowTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            first_name="Chioma",
            last_name="Okeke",
            email="chioma@example.com",
            password="verysecure123",
            role="SUPPLIER",
        )
        self.login_url = reverse("login")
        self.refresh_url = reverse("token_refresh")
        self.logout_url = reverse("logout")
        self.me_url = reverse("user_details")

    def get_tokens_for_user(self):
        response = self.client.post(
            self.login_url,
            {"email": "chioma@example.com", "password": "verysecure123"},
            format="json",
        )
        return response.data["access"], response.data["refresh"]

    def test_login_success(self):
        access, refresh = self.get_tokens_for_user()
        self.assertTrue(access)
        self.assertTrue(refresh)

    def test_login_failure(self):
        response = self.client.post(
            self.login_url,
            {"email": "chioma@example.com", "password": "wrongpass"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_token(self):
        _, refresh = self.get_tokens_for_user()
        response = self.client.post(self.refresh_url, {"refresh": refresh})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_logout_blacklists_refresh_token(self):
        access, refresh = self.get_tokens_for_user()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        response = self.client.post(self.logout_url, {"refresh": refresh})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_me_endpoint_get(self):
        access, _ = self.get_tokens_for_user()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "chioma@example.com")

    def test_me_endpoint_patch(self):
        access, _ = self.get_tokens_for_user()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        response = self.client.patch(
            self.me_url, {"first_name": "Updated", "last_name": "Name"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Updated")
        self.assertEqual(self.user.last_name, "Name")
        self.assertEqual(response.data["first_name"], "Updated")
        self.assertEqual(response.data["last_name"], "Name")

    def test_me_endpoint_patch_invalid_data(self):
        access, _ = self.get_tokens_for_user()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
        response = self.client.patch(
            self.me_url, {"email": "invalid-email", "role": "INVALID_ROLE"}
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)
