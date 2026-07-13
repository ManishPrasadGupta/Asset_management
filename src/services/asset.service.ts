import { db } from "../db";
import { assets } from "../models";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";

type CreateAssetInput = {
  assetCode: string;
  name: string;
  type?: string;
  brand?: string;
  serialNumber?: string;
  purchaseDate?: string; 
  warrantyExpiry?: string; 
  status?: "IN_STOCK" | "ASSIGNED" | "RETIRED";
};

type UpdateAssetInput = Partial<CreateAssetInput>;

export const assetService = {
  async create(data: CreateAssetInput) {
    const [created] = await db
      .insert(assets)
      .values({
        assetCode: data.assetCode,
        name: data.name,
        type: data.type,
        brand: data.brand,
        serialNumber: data.serialNumber,
        purchaseDate: data.purchaseDate,
        warrantyExpiry: data.warrantyExpiry,
        status: data.status ?? "IN_STOCK",
      })
      .returning();

    return created;
  },

  async getAll(query: {
    search?: string;
    status?: "IN_STOCK" | "ASSIGNED" | "RETIRED";
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 10));
    const offset = (page - 1) * limit;
    const search = (query.search || "").trim();

    const searchCondition = search
      ? or(
          ilike(assets.name, `%${search}%`),
          ilike(assets.assetCode, `%${search}%`),
          ilike(assets.serialNumber, `%${search}%`),
          sql`${assets.id}::text ILIKE ${"%" + search + "%"}`,
        )
      : undefined;

    const statusCondition = query.status
      ? eq(assets.status, query.status)
      : undefined;

    const whereCondition =
      searchCondition && statusCondition
        ? and(searchCondition, statusCondition)
        : searchCondition || statusCondition;

    const data = await db
      .select()
      .from(assets)
      .where(whereCondition)
      .orderBy(desc(assets.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ total: count() })
      .from(assets)
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
    const [asset] = await db.select().from(assets).where(eq(assets.id, id));
    return asset ?? null;
  },

  async update(id: string, data: UpdateAssetInput) {
    const [updated] = await db
      .update(assets)
      .set({
        ...(data.assetCode !== undefined ? { assetCode: data.assetCode } : {}),
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.type !== undefined ? { type: data.type } : {}),
        ...(data.brand !== undefined ? { brand: data.brand } : {}),
        ...(data.serialNumber !== undefined
          ? { serialNumber: data.serialNumber }
          : {}),
        ...(data.purchaseDate !== undefined
          ? { purchaseDate: data.purchaseDate }
          : {}),
        ...(data.warrantyExpiry !== undefined
          ? { warrantyExpiry: data.warrantyExpiry }
          : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        updatedAt: new Date(),
      })
      .where(eq(assets.id, id))
      .returning();

    return updated ?? null;
  },

  async remove(id: string) {
    const [deleted] = await db
      .delete(assets)
      .where(eq(assets.id, id))
      .returning();
    return deleted ?? null;
  },
};
