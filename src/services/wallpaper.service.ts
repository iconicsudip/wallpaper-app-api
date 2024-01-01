import Category from "../models/category.model";
import Wallpaper from "../models/wallpaper.model";


export const fetchPaginatedWallpapers = async (page: number, limit: number,query:string,category:string) => {
    let allWallpapers = [];
    if(query === "all" && category === "all"){
        allWallpapers = await Wallpaper.find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('category','_id name');
    }else{
        if(query === "all" && category !== "all"){
            const getCategory = await Category.find({
                name:category
            })
            allWallpapers = await Wallpaper.find({
                category:{
                    $in:[getCategory[0]?._id]
                }
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('category','_id name');
        }else if(query !== "all" && category === "all"){
            allWallpapers = await Wallpaper.find({
                name: { 
                    $regex: query, 
                    $options: "i" 
                }
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('category','_id name');
        }else{
            const getCategory = await Category.find({
                name:category
            })
            allWallpapers = await Wallpaper.find({
                name: { 
                    $regex: query, 
                    $options: "i" 
                },
                category:{
                    $in:[getCategory[0]?._id]
                }
            })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('category','_id name');
        }
    }
        
    return allWallpapers;
}

export const fetchAllWallpapers = async (query:string,category:string) => {
    let allWallpapers = [];
    if(query === "all" && category === "all"){
        allWallpapers = await Wallpaper.find({})
        .sort({ createdAt: -1 })
        .populate('category','_id name');
    }else{
        if(query === "all" && category !== "all"){
            const getCategory = await Category.find({
                name:category
            })
            allWallpapers = await Wallpaper.find({
                category:{
                    $in:[getCategory[0]?._id]
                }
            })
            .sort({ createdAt: -1 })
            .populate('category','_id name')
            
        }else if(query !== "all" && category === "all"){
            allWallpapers = await Wallpaper.find({
                name: { 
                    $regex: query, 
                    $options: "i" 
                }
            })
            .populate('category','_id name')
            .sort({ createdAt: -1 });
        }else{
            const getCategory = await Category.find({
                name:category
            })
            allWallpapers = await Wallpaper.find({
                name: { 
                    $regex: query, 
                    $options: "i" 
                },
                category:{
                    $in:[getCategory[0]?._id]
                }
            })
            .populate('category','_id name')
            .sort({ createdAt: -1 });
        }
    }
        
    return allWallpapers;
}

export const getCurrentTime = () => {
    const date = new Date();
    const dateTime = date.getTime();
    return dateTime;
}