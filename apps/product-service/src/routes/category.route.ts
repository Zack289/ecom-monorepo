import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.controller";
import { shouldBeAdmin } from "../midleware/authMiddleware";

const router: Router = Router();

router.post("/",shouldBeAdmin, createCategory);
router.put("/:id",shouldBeAdmin, updateCategory);
router.delete("/:id",shouldBeAdmin, deleteCategory);
router.get("/", getCategories);

export default router;
