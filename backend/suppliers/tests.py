from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from suppliers.models import SupplierProfile

User = get_user_model()


class SupplierProfileAPITest(APITestCase):
    def setUp(self):
        self.supplier = User.objects.create_user(
            first_name="Test",
            last_name="Supplier",
            email="supplier@example.com",
            password="password123",
            role="SUPPLIER",
        )
        self.client.login(email="supplier@example.com", password="password123")
        self.profile_url = reverse("supplier_profile")

    def authenticate(self):
        response = self.client.post(
            reverse("login"),  # adjust if you use a different route
            {"email": "supplier@example.com", "password": "password123"},
            format="json",
        )
        token = response.data.get("access")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_create_supplier_profile(self):
        self.authenticate()
        data = {
            "business_name": "Test Supplies",
            "bio": "We provide top-notch materials.",
            "state": "Ebonyi",
            "city": "Abakaliki",
        }
        response = self.client.post(self.profile_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(SupplierProfile.objects.filter(user=self.supplier).exists())

    def test_cannot_create_duplicate_profile(self):
        self.authenticate()
        SupplierProfile.objects.create(
            user=self.supplier,
            business_name="Existing Biz",
            state="Ebonyi",
            city="Abakaliki",
        )
        data = {
            "business_name": "Another Biz",
            "state": "Ebonyi",
            "city": "Abakaliki",
        }
        response = self.client.post(self.profile_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_retrieve_supplier_profile(self):
        self.authenticate()
        profile = SupplierProfile.objects.create(
            user=self.supplier,
            business_name="My Shop",
            state="Ebonyi",
            city="Abakaliki",
        )
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["business_name"], profile.business_name)

    def test_patch_supplier_profile(self):
        self.authenticate()
        SupplierProfile.objects.create(
            user=self.supplier,
            business_name="Old Name",
            state="Ebonyi",
            city="Abakaliki",
        )
        response = self.client.patch(self.profile_url, {"business_name": "New Name"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        profile = SupplierProfile.objects.get(user=self.supplier)
        self.assertEqual(profile.business_name, "New Name")

    def test_unauthenticated_access_denied(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
