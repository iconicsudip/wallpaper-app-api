import { Router } from "express";
import wallpaperRouters from "./wallpaper.router";
import categoryRouters from "./category.router";

const mainRoutes = Router();
// mainRoutes.get("/",(req,res)=>{
//     res.send("Api is working");
// })
mainRoutes.use("/api/v1/wallpapers",wallpaperRouters)
mainRoutes.use("/api/v1/categories",categoryRouters)

export default mainRoutes;