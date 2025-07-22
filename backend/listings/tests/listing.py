from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from listings.models import Listing, Category
from suppliers.models import SupplierProfile as Supplier

User = get_user_model()


class ListingAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="supplier1@mail.com",
            password="pass1234",
            role="SUPPLIER",
            first_name="Test",
            last_name="Supplier",
        )
        self.supplier = Supplier.objects.create(
            user=self.user, business_name="Biz 1", state="Colorado", city="Denver"
        )

        self.category = Category.objects.create(name="Electronics")

        self.listing = Listing.objects.create(
            title="Laptop",
            description="Powerful laptop",
            price=999.99,
            category=self.category,
            supplier=self.supplier,
            stock_quantity=10,
        )
        self.list_url = reverse("listing-list-create")
        self.detail_url = reverse("listing-detail", args=[self.listing.pk])

    def authenticate(self, email=None, password=None):
        response = self.client.post(
            reverse("login"),
            {"email": email, "password": password},
            format="json",
        )
        token = response.data.get("access")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_listings_list_view(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_listing_detail_view(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["description"], self.listing.description)

    def test_unauthenticated_listing_create_fails(self):
        data = {
            "title": "New Phone",
            "description": "Smartphone",
            "price": "250.00",
            "category": self.category.id,
            "stock_quantity": 5,
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_supplier_can_create_listing(self):
        self.authenticate(email="supplier1@mail.com", password="pass1234")
        data = {
            "title": "New Phone",
            "description": "Smartphone",
            "price": "250.00",
            "category": self.category.id,
            "stock_quantity": 5,
        }
        response = self.client.post(self.list_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], "New Phone")

    def test_non_owner_cannot_update_listing(self):
        other_user = User.objects.create_user(
            email="supplier2@mail.com",
            password="pass4567",
            role="SUPPLIER",
            first_name="Test_2",
            last_name="Supplier",
        )
        Supplier.objects.create(
            user=other_user, business_name="OtherBiz", state="Texas", city="Houston"
        )
        self.authenticate(email="supplier2@mail.com", password="pass4567")

        data = {"title": "Updated Title"}
        response = self.client.patch(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_owner_can_update_listing(self):
        self.authenticate(email="supplier1@mail.com", password="pass1234")
        data = {"title": "Updated Title"}
        response = self.client.patch(self.detail_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Updated Title")

    def test_owner_can_delete_listing(self):
        self.authenticate(email="supplier1@mail.com", password="pass1234")
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_deleted_listing_not_retrievable(self):
        self.listing.is_active = False
        self.listing.save()
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
