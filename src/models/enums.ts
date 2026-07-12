import { pgEnum } from "drizzle-orm/pg-core";

export const employeeStatusEnum = pgEnum("employee_status", [
  "ACTIVE",
  "INACTIVE",
  "EXITED",
]);

export const assetStatusEnum = pgEnum("asset_status", [
  "IN_STOCK",
  "ASSIGNED",
  "RETIRED",
]);

export const assignmentStatusEnum = pgEnum("assignment_status", [
  "ASSIGNED",
  "RETURNED",
]);
