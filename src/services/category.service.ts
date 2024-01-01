import Category from "../models/category.model";

export const fetchAllCategories = async () => {
    const allCategories = await Category.find({});
    return allCategories;
}