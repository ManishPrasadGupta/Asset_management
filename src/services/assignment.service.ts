import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../db";
import { assetAssignments, assets, employees } from "../models";

export const assignmentService = {
  async assignAsset(input: {
    assetId: string;
    employeeId: string;
    remarks?: string;
  }) {
    // validate asset exists
    const [asset] = await db
      .select()
      .from(assets)
      .where(eq(assets.id, input.assetId));
    if (!asset) throw new Error("Asset not found");

    // validate employee exists
    const [employee] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, input.employeeId));
    if (!employee) throw new Error("Employee not found");

    // check asset already assigned (active assignment exists)
    const [active] = await db
      .select()
      .from(assetAssignments)
      .where(
        and(
          eq(assetAssignments.assetId, input.assetId),
          eq(assetAssignments.status, "ASSIGNED"),
          isNull(assetAssignments.returnedAt),
        ),
      );

    if (active) throw new Error("Asset is already assigned");

    // create assignment record
    const [assignment] = await db
      .insert(assetAssignments)
      .values({
        assetId: input.assetId,
        employeeId: input.employeeId,
        remarks: input.remarks,
        status: "ASSIGNED",
      })
      .returning();

    // update asset status
    await db
      .update(assets)
      .set({ status: "ASSIGNED", updatedAt: new Date() })
      .where(eq(assets.id, input.assetId));

    return assignment;
  },

  async returnAsset(input: { assetId: string; remarks?: string }) {
    // find active assignment
    const [active] = await db
      .select()
      .from(assetAssignments)
      .where(
        and(
          eq(assetAssignments.assetId, input.assetId),
          eq(assetAssignments.status, "ASSIGNED"),
          isNull(assetAssignments.returnedAt),
        ),
      );

    if (!active) throw new Error("No active assignment found for this asset");

    // close assignment
    const [updatedAssignment] = await db
      .update(assetAssignments)
      .set({
        status: "RETURNED",
        returnedAt: new Date(),
        remarks: input.remarks ?? active.remarks ?? null,
        updatedAt: new Date(),
      })
      .where(eq(assetAssignments.id, active.id))
      .returning();

    // set asset IN_STOCK
    await db
      .update(assets)
      .set({ status: "IN_STOCK", updatedAt: new Date() })
      .where(eq(assets.id, input.assetId));

    return updatedAssignment;
  },

  async getAllHistory() {
    return db
      .select()
      .from(assetAssignments)
      .orderBy(desc(assetAssignments.assignedAt));
  },

  async getAssetHistory(assetId: string) {
    return db
      .select()
      .from(assetAssignments)
      .where(eq(assetAssignments.assetId, assetId))
      .orderBy(desc(assetAssignments.assignedAt));
  },

  async getEmployeeHistory(employeeId: string) {
    return db
      .select()
      .from(assetAssignments)
      .where(eq(assetAssignments.employeeId, employeeId))
      .orderBy(desc(assetAssignments.assignedAt));
  },
};
