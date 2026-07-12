import { Request, Response } from "express";
import { assetService } from "../services/asset.service";

interface AssetParams {
  id: string;
}

export const assetController = {
  async create(req: Request, res: Response) {
    try {
      const {
        assetCode,
        name,
        type,
        brand,
        serialNumber,
        purchaseDate,
        warrantyExpiry,
        status,
      } = req.body;

      if (!assetCode || !name) {
        return res.status(400).json({
          success: false,
          message: "assetCode and name are required",
        });
      }

      const asset = await assetService.create({
        assetCode,
        name,
        type,
        brand,
        serialNumber,
        purchaseDate,
        warrantyExpiry,
        status,
      });

      return res.status(201).json({
        success: true,
        message: "Asset created successfully",
        data: asset,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await assetService.getAll({
        search: req.query.search as string,
        status: req.query.status as "IN_STOCK" | "ASSIGNED" | "RETIRED",
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      });

      return res.status(200).json({
        success: true,
        message: "Assets fetched successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  async getById(req: Request<AssetParams>, res: Response) {
    try {
      const { id } = req.params;
      const asset = await assetService.getById(id);

      if (!asset) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Asset fetched successfully",
        data: asset,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  async update(req: Request<AssetParams>, res: Response) {
    try {
      const { id } = req.params;
      const updated = await assetService.update(id, req.body);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Asset updated successfully",
        data: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  async remove(req: Request<AssetParams>, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await assetService.remove(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Asset not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Asset deleted successfully",
        data: deleted,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
