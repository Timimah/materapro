from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from users.models import User
from listings.models import Category


class CategoryAPITests(APITestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            email="admin@example.com", password="adminpass"
        )
        self.normal_user = User.objects.create_user(
            email="user@example.com", password="userpass"
        )

        self.root_category = Category.objects.create(name="Electronics")
        self.child_category1 = Category.objects.create(
            name="Phones", parent=self.root_category
        )
        self.child_category2 = Category.objects.create(
            name="Laptops", parent=self.root_category
        )

    def test_list_categories(self):
        url = reverse("category-list-create")  # Adjust name to your actual URL name
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["name"], "Electronics")
        self.assertEqual(len(response.data[0]["subcategories"]), 2)

    def test_admin_can_create_category(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse("category-list-create")
        data = {"name": "Home Appliances"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Category.objects.filter(name="Home Appliances").exists())

    def test_non_admin_cannot_create_category(self):
        self.client.force_authenticate(user=self.normal_user)
        url = reverse("category-list-create")
        data = {"name": "Unauthorized"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_update_category(self):
        self.client.force_authenticate(user=self.admin_user)
        url = reverse("category-detail", kwargs={"pk": self.root_category.pk})
        data = {"name": "Updated Electronics"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.root_category.refresh_from_db()
        self.assertEqual(self.root_category.name, "Updated Electronics")

    def test_non_admin_cannot_update_category(self):
        self.client.force_authenticate(user=self.normal_user)
        url = reverse("category-detail", kwargs={"pk": self.root_category.pk})
        data = {"name": "Sneaky Edit"}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
