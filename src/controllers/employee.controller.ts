import { Request, Response } from "express";
import { employeeService } from "../services/employee.service";

interface EmployeeParams {
  id: string;
}

export const employeeController = {
  // Create a new employee
  async create(req: Request, res: Response) {
    try {
      const {
        employeeCode,
        name,
        email,
        phone,
        designation,
        departmentId,
        joiningDate,
        status,
      } = req.body;

      if (!employeeCode || !name || !email || !departmentId) {
        return res.status(400).json({
          success: false,
          message: "employeeCode, name, email, departmentId are required",
        });
      }

      const employee = await employeeService.create({
        employeeCode,
        name,
        email,
        phone,
        designation,
        departmentId,
        joiningDate,
        status,
      });

      return res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: employee,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  // Fetch all employees
  async getAll(req: Request, res: Response) {
    try {
      const result = await employeeService.getAll({
        search: req.query.search as string,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      });

      return res.status(200).json({
        success: true,
        message: "Employees fetched successfully",
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

  // Fetch an employee by ID
  async getById(req: Request<EmployeeParams>, res: Response) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getById(id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Employee fetched successfully",
        data: employee,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  // Update an employee by ID
  async update(req: Request<EmployeeParams>, res: Response) {
    try {
      const { id } = req.params;

      const updated = await employeeService.update(id, req.body);

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Employee updated successfully",
        data: updated,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error?.message ?? "Internal server error",
      });
    }
  },

  // Delete an employee by ID
  async remove(req: Request<EmployeeParams>, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await employeeService.remove(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Employee deleted successfully",
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
