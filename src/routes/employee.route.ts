import { Router } from "express";
import { employeeController } from "../controllers/employee.controller";

const router = Router();

router.post("/", employeeController.create);
router.get("/", employeeController.getAll);
router.get("/:id", employeeController.getById);
router.patch("/:id", employeeController.update);
router.delete("/:id", employeeController.remove);

export default router;
