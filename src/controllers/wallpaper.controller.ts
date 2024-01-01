import { NextFunction, Request, Response, response } from 'express';
import generateResponse from '../utils/response';
import Wallpaper from '../models/wallpaper.model';
import { fetchAllWallpapers, fetchPaginatedWallpapers, getCurrentTime } from '../services/wallpaper.service';
import { initializeApp } from "firebase/app";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from '../config/firebase.config';


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const getAllWallpapers = async (req: Request, res: Response, next: NextFunction) => {
    // try {
    //     let limit = isNaN(Number(req.query.limit)) ? undefined : Number(req.query.limit);
    //     let page = isNaN(Number(req.query.page)) ? undefined : Number(req.query.page);
    //     let query = req.query.query ? String(req.query.query) : "all";
    //     let category = req.query.category ? String(req.query.category) : "all";
    //     const totalWallpapers = await Wallpaper.countDocuments({});
    //     if (!limit && !page) {
    //         const allWallpapers = await fetchAllWallpapers(query, category)
    //         const finalWallpapers = {
    //             data: allWallpapers,
    //             totalWallpapers: totalWallpapers,
    //         }
    //         return generateResponse(res, 200, finalWallpapers, "Successfully fetched all wallpapers");
    //     } else {
    //         page = page ?? 1;
    //         limit = limit ?? 10;
    //         const allWallpapers = await fetchPaginatedWallpapers(page ?? 1, limit ?? 10, query, category);
    //         const totalPages = Math.ceil(totalWallpapers / limit);

    //         const finalWallpapers = {
    //             data: allWallpapers,
    //             page: page ?? 1,
    //             limit: limit ?? 10,
    //             totalPages: totalPages,
    //             totalWallpapers: totalWallpapers,
    //             isNextPage: totalPages > 0 && page < totalPages ? true : false,
    //             isPrevPage: totalPages > 0 && page > 1 ? true : false,
    //             prevPage: totalPages > 0 && page > 1 ? page - 1 : null,
    //             nextPage: totalPages > 0 && page < totalPages ? page + 1 : null,
    //         }
    //         return generateResponse(res, 200, finalWallpapers, "Successfully fetched all wallpapers"
    //         );
    //     }
    // } catch (error) {
    //     next(error);
    // }
    return response.send("Hello");
};

export const createWallpapers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wallpapers = req.body.wallpapers;
        await Wallpaper.insertMany(wallpapers);
        return generateResponse(res, 200, { data: [] }, "Successfully added all wallpapers");
    } catch (error) {
        next(error);
    }
};

export const uploadWallpaper = async (req:any, res: Response, next: NextFunction) => {
    try {
        const wallpaper = req.file;
        
        const dateTime = getCurrentTime();
        
        const storageRef = ref(storage, `${dateTime}-${wallpaper.originalname}`);
        const metaData = {
            contentType: wallpaper.mimetype,
        }
        const uploadWallpaper = await uploadBytesResumable(storageRef, wallpaper.buffer, metaData);
        const url = await getDownloadURL(uploadWallpaper.ref);
        const wallpaperData = {
            name: wallpaper.originalname,
            url: url,
            type: wallpaper.mimetype,
            size: wallpaper.size,
        }
        return generateResponse(res, 200, wallpaperData, "Successfully added wallpaper");
    } catch (error) {
        next(error);
    }
}

export const getWallpaperById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wallpaperId = req.params.wallpaperId;
        const wallpaper = await Wallpaper.findById(wallpaperId).populate('category','_id name');
        const wallpaperData = {
            data: wallpaper,
        }
        return generateResponse(res, 200, wallpaperData, "Successfully fetched wallpaper");
    } catch (error) {
        next(error);
    }
}