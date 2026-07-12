import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { assets } from "./asset.model";
import { employees } from "./employee.model";
import { assignmentStatusEnum } from "./enums";

export const assetAssignments = pgTable("asset_assignments", {
  id: uuid("id").defaultRandom().primaryKey(),
  assetId: uuid("asset_id")
    .notNull()
    .references(() => assets.id, { onDelete: "restrict", onUpdate: "cascade" }),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => employees.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  assignedAt: timestamp("assigned_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  returnedAt: timestamp("returned_at", { withTimezone: true }),
  status: assignmentStatusEnum("status").default("ASSIGNED").notNull(),
  remarks: text("remarks"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
