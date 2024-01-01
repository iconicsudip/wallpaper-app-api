import {Router} from "express";
import { createWallpapers, getAllWallpapers, getWallpaperById, uploadWallpaper } from "../controllers/wallpaper.controller";
import multer from "multer";
const wallpaperRouters = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // limit to 5MB
    },
});

wallpaperRouters.get("/", getAllWallpapers);
wallpaperRouters.post("/", createWallpapers);
wallpaperRouters.post("/upload",upload.single("file"), uploadWallpaper);
wallpaperRouters.get("/:wallpaperId", getWallpaperById);


export default wallpaperRouters;