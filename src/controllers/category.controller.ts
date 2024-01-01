import { Request,Response,NextFunction } from "express";
import generateResponse from '../utils/response';
import { fetchAllCategories } from "../services/category.service";
import Category from "../models/category.model";

export const getAllCategories = async (req:Request, res:Response,next: NextFunction) => {
    try {
        const allCategories = await fetchAllCategories();
        const totalCategories = await Category.countDocuments({});
        const finalCategories = {
            data: allCategories,
            totalCategories: totalCategories,
        }
        return generateResponse(res,200,finalCategories,"Successfully fetched all categories");
    } catch (error) {
        next(error);
    }
}

export const createCategories = async (req:Request, res:Response,next: NextFunction) => {
    try {
        const categories = req.body.categories.map((category:string)=>{
            return {
                name:category
            }
        });
        await Category.insertMany(categories);
        return generateResponse(res,200,{data:[]},"Successfully added all categories");

    } catch (error) {
        next(error);
    }
}