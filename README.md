# Asset Management API

A TypeScript + Express + PostgreSQL backend for managing assets, employees, departments, and asset assignments.

---

## 📌 Project Summary

This project is a backend API for an Asset Management system with exactly **4 core models**:

- **Asset**
- **Employee**
- **Department**
- **Asset Assignment**

It uses **Drizzle ORM** for schema/migrations and follows a clean layered structure:

- Routes
- Controllers
- Services
- Models

---

## 🧱 Core Data Models (4)

### 1) Asset (`asset.model.ts`)
Represents a physical/company asset (e.g., laptop, monitor, phone, etc.).

### 2) Employee (`employee.model.ts`)
Represents an employee who can be assigned assets.

### 3) Department (`department.model.ts`)
Represents organizational departments and groups employees logically.

### 4) Asset Assignment (`asset-assignment.model.ts`)
Tracks asset allocation from assets to employees (assignment history/records).

---

## 🛠 Tech Stack

- **Node.js**
- **Express 5**
- **TypeScript**
- **PostgreSQL**
- **Drizzle ORM**
- **Drizzle Kit**
- **dotenv**
- **cors**

---

## 📂 Folder Structure

```text
Asset_management/
├── drizzle/
│   ├── 0000_yellow_wilson_fisk.sql
│   └── meta/
├── dist/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── controllers/
│   │   ├── asset.controller.ts
│   │   ├── assignment.controller.ts
│   │   ├── department.controller.ts
│   │   └── employee.controller.ts
│   ├── routes/
│   │   ├── asset.route.ts
│   │   ├── assignment.route.ts
│   │   ├── department.route.ts
│   │   └── employee.route.ts
│   ├── services/
│   ├── models/
│   │   ├── asset.model.ts
│   │   ├── asset-assignment.model.ts
│   │   ├── department.model.ts
│   │   ├── employee.model.ts
│   │   ├── enums.ts
│   │   └── index.ts
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
- PostgreSQL database

---

## 🚀 Setup & Run

### 1. Clone repo
```bash
git clone https://github.com/ManishPrasadGupta/Asset_management.git
cd Asset_management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create `.env` in project root:

```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/asset_management
```

> Replace with your actual DB credentials.

### 4. Run migrations / schema sync
```bash
npm run drizzle:generate
npm run drizzle:migrate
# or
npm run drizzle:push
```

### 5. Start development server
```bash
npm run dev
```

### 6. Build & run production
```bash
npm run build
npm start
```

---

## 📜 Scripts

From `package.json`:

- `npm run dev` → start in dev mode (`ts-node-dev`)
- `npm run build` → compile TypeScript
- `npm start` → run compiled app from `dist`
- `npm run drizzle:generate` → generate migrations
- `npm run drizzle:migrate` → apply migrations
- `npm run drizzle:push` → push schema directly

---

## 🧭 API Modules

Routes/controllers are organized by module:

- `asset.route.ts` ↔ `asset.controller.ts`
- `employee.route.ts` ↔ `employee.controller.ts`
- `department.route.ts` ↔ `department.controller.ts`
- `assignment.route.ts` ↔ `assignment.controller.ts`

This keeps request handling separated by domain and easier to maintain.

---

## 🔐 Environment Variables

| Variable       | Required | Description                         |
|----------------|----------|-------------------------------------|
| `PORT`         | No       | API server port                     |
| `DATABASE_URL` | Yes      | PostgreSQL connection string        |

---

## ✅ Suggested API Base URL

Local:
```text
http://localhost:5000
```

---

## 📈 Possible Improvements

- Add request validation (Zod/Joi)
- Add global error handling middleware

---

## 👤 Author

**Manish Prasad Gupta**  
GitHub: [@ManishPrasadGupta](https://github.com/ManishPrasadGupta)

---

## 📄 License

ISC
