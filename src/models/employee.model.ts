import { pgTable, uuid, varchar, timestamp, date } from "drizzle-orm/pg-core";
import { departments } from "./department.model";
import { employeeStatusEnum } from "./enums";

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeCode: varchar("employee_code", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 150 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  designation: varchar("designation", { length: 100 }),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, {
      onDelete: "restrict",
      onUpdate: "cascade",
    }),
  joiningDate: date("joining_date"),
  status: employeeStatusEnum("status").default("ACTIVE").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
