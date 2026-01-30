# Nimap Product Project (Backend)

A small Node.js + EJS + MySQL backend for managing Categories and Products (machine test implementation).

---

##  Quick Start

Requirements:
- Node.js
- MySQL
- npm

Steps:
1. Install dependencies
```bash
cd Backend
npm install
```
2. Copy environment example and set values
```bash
cp .env.example .env
# then edit .env to set DB_USER and DB_PASSWORD (and PORT if needed)
```
3. Create the database and tables (example):
```sql
CREATE DATABASE nimap_test;
USE nimap_test;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  category_id INT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```
4. Run the app (dev)
```bash
npm run dev
```
Visit: http://localhost:3000/ (or the `PORT` set in `.env`)

---

##  Project Features
- Category Master: Create / Read / Update / Delete (via UI & REST API)
- Product Master: Create / Read / Update / Delete (product belongs to category)
- Product list returns ProductId, ProductName, CategoryName, CategoryId
- Server-side pagination for products (limit & offset)
- EJS-based views for simple UI
- Centralized error handler and unified response format (in `utils/responseHandler.js`)


## API Endpoints (REST)
- `GET /api/categories` — list categories
- `POST /api/categories` — create category
- `GET /api/categories/:id` — get category
- `PUT /api/categories/:id` — update category
- `DELETE /api/categories/:id` — delete category

- `GET /api/products?page=1&limit=10` — paginated product list
- `POST /api/products` — create product
- `GET /api/products/:id` — get product
- `PUT /api/products/:id` — update product
- `DELETE /api/products/:id` — delete product

Notes: API responses use `{ success, message, data }` format. The products endpoint returns `data: { page, limit, total, totalPages, data: [...] }`.
