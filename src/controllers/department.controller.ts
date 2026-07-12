import { Request, Response } from "express";
import { departmentService } from "../services/department.service";

interface DepartmentParams {
  id: string;
}

export const departmentController = {
  // Create a new department
  async create(req: Request<DepartmentParams>, res: Response) {
    try {
      const { name, description } = req.body;

      if (!name || typeof name !== "string") {
        return res.status(400).json({
          success: false,
          message: "name is required and must be a string",
        });
      }

      const department = await departmentService.create({ name, description });

      return res.status(201).json({
        success: true,
        message: "Department created successfully",
        data: department,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  // Fetch all departments
  async getAll(req: Request, res: Response) {
    try {
      const result = await departmentService.getAll({
        search: req.query.search as string,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      });

      return res.status(200).json({
        success: true,
        message: "Departments fetched successfully",
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

  // Fetch a department by ID
  async getById(req: Request<DepartmentParams>, res: Response) {
    try {
      const { id } = req.params;
      const department = await departmentService.getById(id);

      if (!department) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Department fetched successfully",
        data: department,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  // Update a department by ID
  async update(req: Request<DepartmentParams>, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const updated = await departmentService.update(id, { name, description });

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Department updated successfully",
        data: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  // Delete a department by ID
  async remove(req: Request<DepartmentParams>, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await departmentService.remove(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Department not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Department deleted successfully",
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
