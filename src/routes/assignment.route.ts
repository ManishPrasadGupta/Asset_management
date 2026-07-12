import { Router } from "express";
import { assignmentController } from "../controllers/assignment.controller";

const router = Router();

router.post("/assign", assignmentController.assign);
router.post("/return", assignmentController.returnAsset);

router.get("/history", assignmentController.getAllHistory);
router.get("/history/asset/:assetId", assignmentController.getAssetHistory);
router.get(
  "/history/employee/:employeeId",
  assignmentController.getEmployeeHistory,
);

export default router;
