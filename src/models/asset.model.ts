import { pgTable, uuid, varchar, timestamp, date } from "drizzle-orm/pg-core";
import { assetStatusEnum } from "./enums";

export const assets = pgTable("assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  assetCode: varchar("asset_code", { length: 20 }).notNull().unique(),
  name: varchar("name", { length: 120 }).notNull(),
  type: varchar("type", { length: 80 }),
  brand: varchar("brand", { length: 80 }),
  serialNumber: varchar("serial_number", { length: 120 }).unique(),
  purchaseDate: date("purchase_date"),
  warrantyExpiry: date("warranty_expiry"),
  status: assetStatusEnum("status").default("IN_STOCK").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
