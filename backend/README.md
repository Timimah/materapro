---

# 📁 backend/README.md

## Backend – Django API

This folder contains the backend logic for MateraPro, built with Django and Django REST Framework.

---

## 🔧 Setup Instructions

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update credentials (DB, Secret Key, etc).

```bash
cp .env.example .env
```

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Start Development Server

```bash
python manage.py runserver
```

---

## 📬 API Overview

* `api/auth/` – Registration, login, role assignment
* `api/users/` – User profile endpoints
* `api/products/` – Supplier/artisan listings
* `api/orders/` – Client orders and transactions

Use `/api/docs/` for Swagger or DRF browsable API (if configured).

---

## 🧪 Testing

```bash
python manage.py test
```

Tests live under `backend/tests/`

---