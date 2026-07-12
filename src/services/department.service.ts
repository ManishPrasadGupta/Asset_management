import { db } from "../db";
import { departments } from "../models";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";

type CreateDepartmentInput = {
  name: string;
  description?: string;
};

type UpdateDepartmentInput = {
  name?: string;
  description?: string;
};

export const departmentService = {
  async create(data: CreateDepartmentInput) {
    const [created] = await db
      .insert(departments)
      .values({
        name: data.name,
        description: data.description,
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
          ilike(departments.name, `%${search}%`),
          sql`${departments.id}::text ILIKE ${"%" + search + "%"}`,
        )
      : undefined;

    const data = await db
      .select()
      .from(departments)
      .where(whereCondition)
      .orderBy(desc(departments.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ total: count() })
      .from(departments)
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
    const [department] = await db
      .select()
      .from(departments)
      .where(eq(departments.id, id));

    return department ?? null;
  },

  async update(id: string, data: UpdateDepartmentInput) {
    const [updated] = await db
      .update(departments)
      .set({
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(departments.id, id))
      .returning();

    return updated ?? null;
  },

  async remove(id: string) {
    const [deleted] = await db
      .delete(departments)
      .where(eq(departments.id, id))
      .returning();

    return deleted ?? null;
  },
};
