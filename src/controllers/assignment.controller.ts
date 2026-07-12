import { Request, Response } from "express";
import { assignmentService } from "../services/assignment.service";

interface AssignmentParams {
  assetId: string;
  employeeId: string;
}

export const assignmentController = {
  async assign(req: Request, res: Response) {
    try {
      const { assetId, employeeId, remarks } = req.body;

      if (!assetId || !employeeId) {
        return res.status(400).json({
          success: false,
          message: "assetId and employeeId are required",
        });
      }

      const data = await assignmentService.assignAsset({
        assetId,
        employeeId,
        remarks,
      });

      return res.status(201).json({
        success: true,
        message: "Asset assigned successfully",
        data,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error?.message ?? "Failed to assign asset",
      });
    }
  },

  async returnAsset(req: Request, res: Response) {
    try {
      const { assetId, remarks } = req.body;

      if (!assetId) {
        return res.status(400).json({
          success: false,
          message: "assetId is required",
        });
      }

      const data = await assignmentService.returnAsset({ assetId, remarks });

      return res.status(200).json({
        success: true,
        message: "Asset returned successfully",
        data,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error?.message ?? "Failed to return asset",
      });
    }
  },

  async getAllHistory(_req: Request, res: Response) {
    try {
      const data = await assignmentService.getAllHistory();
      return res.status(200).json({
        success: true,
        message: "Assignment history fetched successfully",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  async getAssetHistory(req: Request<AssignmentParams>, res: Response) {
    try {
      const { assetId } = req.params;
      const data = await assignmentService.getAssetHistory(assetId);

      return res.status(200).json({
        success: true,
        message: "Asset assignment history fetched successfully",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  async getEmployeeHistory(req: Request<AssignmentParams>, res: Response) {
    try {
      const { employeeId } = req.params;
      const data = await assignmentService.getEmployeeHistory(employeeId);

      return res.status(200).json({
        success: true,
        message: "Employee assignment history fetched successfully",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },
};
