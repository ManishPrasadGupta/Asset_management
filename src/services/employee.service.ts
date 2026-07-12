import { db } from "../db";
import { employees, departments } from "../models";
import { count, desc, ilike, or, sql, eq } from "drizzle-orm";

type CreateEmployeeInput = {
  employeeCode: string;
  name: string;
  email: string;
  phone?: string;
  designation?: string;
  departmentId: string;
  joiningDate?: string; // YYYY-MM-DD
  status?: "ACTIVE" | "INACTIVE" | "EXITED";
};

type UpdateEmployeeInput = Partial<CreateEmployeeInput>;

export const employeeService = {
  async create(data: CreateEmployeeInput) {
    // validate department exists
    const [dept] = await db
      .select()
      .from(departments)
      .where(eq(departments.id, data.departmentId));

    if (!dept) {
      throw new Error("Invalid departmentId: department not found");
    }

    const [created] = await db
      .insert(employees)
      .values({
        employeeCode: data.employeeCode,
        name: data.name,
        email: data.email,
        phone: data.phone,
        designation: data.designation,
        departmentId: data.departmentId,
        joiningDate: data.joiningDate,
        status: data.status ?? "ACTIVE",
      })
      .returning();

    return created;
  },

  async getAll(query: { search?: string; page?: number; limit?: number }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
    const offset = (page - 1) * limit;
    const search = (query.search || "").trim();

    const whereCondition = search
      ? or(
          ilike(employees.name, `%${search}%`),
          ilike(employees.email, `%${search}%`),
          ilike(employees.employeeCode, `%${search}%`),
          sql`${employees.id}::text ILIKE ${"%" + search + "%"}`,
        )
      : undefined;

    const data = await db
      .select()
      .from(employees)
      .where(whereCondition)
      .orderBy(desc(employees.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ total: count() })
      .from(employees)
      .where(whereCondition);

    const total = Number(totalResult[0]?.total ?? 0);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getById(id: string) {
    const [employee] = await db
      .select()
      .from(employees)
      .where(eq(employees.id, id));

    return employee ?? null;
  },

  async update(id: string, data: UpdateEmployeeInput) {
    if (data.departmentId) {
      const [dept] = await db
        .select()
        .from(departments)
        .where(eq(departments.id, data.departmentId));

      if (!dept) {
        throw new Error("Invalid departmentId: department not found");
      }
    }

    const [updated] = await db
      .update(employees)
      .set({
        ...(data.employeeCode !== undefined
          ? { employeeCode: data.employeeCode }
          : {}),
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.email !== undefined ? { email: data.email } : {}),
        ...(data.phone !== undefined ? { phone: data.phone } : {}),
        ...(data.designation !== undefined
          ? { designation: data.designation }
          : {}),
        ...(data.departmentId !== undefined
          ? { departmentId: data.departmentId }
          : {}),
        ...(data.joiningDate !== undefined
          ? { joiningDate: data.joiningDate }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        updatedAt: new Date(),
      })
      .where(eq(employees.id, id))
      .returning();

    return updated ?? null;
  },

  async remove(id: string) {
    const [deleted] = await db
      .delete(employees)
      .where(eq(employees.id, id))
      .returning();

    return deleted ?? null;
  },
};
