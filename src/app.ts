import express from "express";
import cors from "cors";

import departmentRoutes from "./routes/department.route";
import employeeRoutes from "./routes/employee.route";
import assetRoutes from "./routes/asset.route";
import assignmentRoutes from "./routes/assignment.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Asset Management Backend Running 🚀");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

// Department routes
app.use("/api/departments", departmentRoutes);

// Employee routes
app.use("/api/employees", employeeRoutes);

// Asset routes
app.use("/api/assets", assetRoutes);

// Assets Assignment routes
app.use("/api/assignments", assignmentRoutes);
export default app;
