import {Router} from "express";
import { createCategories, getAllCategories } from "../controllers/category.controller";
const categoryRouters = Router();

categoryRouters.get("/", getAllCategories);
categoryRouters.post("/", createCategories);

export default categoryRouters;