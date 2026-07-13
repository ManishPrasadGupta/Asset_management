# Asset Management API

A TypeScript + Express + PostgreSQL backend for managing assets, employees, departments, and asset assignments.

---

## 📌 Project Summary

This project is a backend API for an Asset Management system with exactly **4 core models**:

1. **Asset**
2. **Employee**
3. **Department**
4. **Asset Assignment**

---

## 🧱 Core Models

- `asset.model.ts`
- `employee.model.ts`
- `department.model.ts`
- `asset-assignment.model.ts`

---

## 🛠 Tech Stack

- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Drizzle ORM
- Drizzle Kit
- dotenv
- cors

---

## 📂 Folder Structure

```text
Asset_management/
├── drizzle/
├── dist/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── db/
├── drizzle.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## ⚙️ Prerequisites

- Node.js (LTS recommended)
- npm
- PostgreSQL

---

## 🚀 Setup

### 1) Clone
```bash
git clone https://github.com/ManishPrasadGupta/Asset_management.git
cd Asset_management
```

### 2) Install dependencies
```bash
npm install
```

### 3) Add `.env`
```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/asset_management
```

### 4) Run migrations / schema
```bash
npm run drizzle:generate
npm run drizzle:migrate
# or
npm run drizzle:push
```

### 5) Start app
```bash
npm run dev
```

---

## 📜 Scripts

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run drizzle:generate`
- `npm run drizzle:migrate`
- `npm run drizzle:push`

---

## 🌐 Base URL

```text
http://localhost:5000
```

---

## ✅ Quick Checks

- `GET http://localhost:5000/`
- `GET http://localhost:5000/health`

---

## 🧪 Test URLs

## 1) Asset Assignment APIs

### Assign Asset
- **POST** `http://localhost:5000/api/assignments/assign`

Request body:
```json
{
  "assetId": "<asset-uuid>",
  "employeeId": "<employee-uuid>",
  "remarks": "Issued for project X"
}
```

### Return Asset
- **POST** `http://localhost:5000/api/assignments/return`

Request body:
```json
{
  "assetId": "<asset-uuid>",
  "remarks": "Returned in good condition"
}
```

### Assignment History
- **GET** `http://localhost:5000/api/assignments/history`
- **GET** `http://localhost:5000/api/assignments/history/asset/<asset-uuid>`
- **GET** `http://localhost:5000/api/assignments/history/employee/<employee-uuid>`

---

## 2) Department APIs

### CRUD Endpoints (Full URLs)
- **POST** `http://localhost:5000/api/departments`
- **GET** `http://localhost:5000/api/departments`
- **GET** `http://localhost:5000/api/departments/:id`
- **PATCH** `http://localhost:5000/api/departments/:id`
- **DELETE** `http://localhost:5000/api/departments/:id`

### List/Search Test URLs
- **GET** `/api/departments?page=1&limit=5`
- **GET** `/api/departments?search=it&page=1&limit=5`
- **GET** `/api/departments?search=<uuid-part>&page=1&limit=5`

---

## 3) Employee APIs

### CRUD Endpoints (Full URLs)
- **POST** `http://localhost:5000/api/employees`
- **GET** `http://localhost:5000/api/employees`
- **GET** `http://localhost:5000/api/employees/:id`
- **PATCH** `http://localhost:5000/api/employees/:id`
- **DELETE** `http://localhost:5000/api/employees/:id`

### List/Search Test URLs
- **GET** `/api/employees?page=1&limit=10`
- **GET** `/api/employees?search=manish&page=1&limit=10`
- **GET** `/api/employees?search=EMP001&page=1&limit=10`

---

## 4) Asset APIs

### CRUD Endpoints (Full URLs)
- **POST** `http://localhost:5000/api/assets`
- **GET** `http://localhost:5000/api/assets`
- **GET** `http://localhost:5000/api/assets/:id`
- **PATCH** `http://localhost:5000/api/assets/:id`
- **DELETE** `http://localhost:5000/api/assets/:id`

### List/Search/Filter Test URLs
- **GET** `/api/assets?page=1&limit=10`
- **GET** `/api/assets?search=dell&page=1&limit=10`
- **GET** `/api/assets?status=IN_STOCK&page=1&limit=10`
- **GET** `/api/assets?search=AST001&status=ASSIGNED&page=1&limit=10`

---

## 📈 Future Improvements

- Add validation (Zod/Joi)
- Add centralized error handling
---

## 👤 Author

**Manish Prasad Gupta**  
GitHub: [@ManishPrasadGupta](https://github.com/ManishPrasadGupta)
