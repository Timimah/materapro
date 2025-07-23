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

        # Categories
        self.parent_category = Category.objects.create(name="Building Materials")
        self.sub_category = Category.objects.create(
            name="Wood", parent=self.parent_category
        )

        # Listings
        Listing.objects.create(
            title="Plywood Board",
            price=2500.00,
            supplier=self.supplier,
            category=self.sub_category,
            stock_quantity=10,
            is_active=True,
        )
        Listing.objects.create(
            title="Cement Bag",
            price=3500.00,
            supplier=self.supplier,
            category=self.parent_category,
            stock_quantity=0,
            is_active=True,
        )
        Listing.objects.create(
            title="Nails Pack",
            price=500.00,
            supplier=self.supplier,
            category=self.sub_category,
            stock_quantity=15,
            is_active=True,
        )

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

    def test_filter_by_min_price(self):
        response = self.client.get("/api/v1/listings/?min_price=1000")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 2)

    def test_filter_by_max_price(self):
        response = self.client.get("/api/v1/listings/?max_price=3000")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 3)

    def test_filter_by_in_stock(self):
        response = self.client.get("/api/v1/listings/?in_stock=true")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 3)

    def test_filter_by_category_parent(self):
        url = (
            reverse("listing-list-create")
            + f"?parent_category={self.parent_category.id}"
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            len(response.data["results"]), 2
        )  # Should include Plywood & Nails

    def test_search_by_title(self):
        response = self.client.get("/api/v1/listings/?search=Board")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["title"], "Plywood Board")

    def test_ordering_by_price(self):
        response = self.client.get("/api/v1/listings/?ordering=price")
        self.assertEqual(response.status_code, 200)
        prices = [float(item["price"]) for item in response.data["results"]]
        self.assertEqual(prices, sorted(prices))

    def test_pagination_defaults(self):
        response = self.client.get("/api/v1/listings/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("results", response.data)
        self.assertIsInstance(response.data["results"], list)
