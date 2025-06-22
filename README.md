# 📦 MateraPro

MateraPro is a multi-role digital marketplace designed to connect clients with verified suppliers and skilled artisans. It aims to streamline material sourcing and service contracting across local economies.

## 🚀 MVP Overview

The MVP focuses on building a lean platform with three core roles:

* **Clients**: Browse and request materials or services
* **Suppliers**: Upload and manage product listings
* **Artisans**: Showcase and offer skilled labor

### Core Features

* Multi-role user authentication & registration
* In-app chat for transaction coordination
* Listings: Create, browse, filter materials or services
* Escrow-style payment and delivery logic
* Responsive UI for mobile and desktop use

---

## 📁 Project Structure

```
MateraPro/
├── backend/        # Django backend
├── frontend/       # React frontend
├── .github/        # Templates and workflows
└── docs/           # Project documentation
```

---

## 🛠 Tech Stack

* **Frontend**: React (Vite)
* **Backend**: Django + DRF
* **Database**: PostgreSQL
* **CI/CD**: GitHub Actions
* **Others**: Docker (future), Redis (optional)

---

## 📌 Getting Started

### Prerequisites

* Node.js & npm/yarn
* Python 3.10+
* PostgreSQL

### Clone the Repo

```bash
git clone https://github.com/MateraPro/MateraPro.git
cd MateraPro
```

### Setup Backend

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📄 License

This project is currently proprietary to MateraPro and not under an open-source license.

## 📬 Contact

For partnership or collaboration inquiries: _________