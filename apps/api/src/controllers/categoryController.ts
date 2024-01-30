import { Request, Response } from 'express';
import prisma from '../connection'; // Adjust this import based on your file structure

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body; // Assuming category name is provided in the request body

        const newCategory = await prisma.categories.create({
            data: { name },
        });

        res.status(201).json({
            message: 'Category successfully created',
            category: newCategory,
        });
    } catch (error:any) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

// delete category

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { categoryId } = req.params; // Assuming category ID is passed as a URL parameter

        // Optional: Check if the category is being used in any event before deleting
        const associatedEvents = await prisma.events.findMany({
            where: { categories: { some: { categoryId: categoryId } } }
        });
        if (associatedEvents.length > 0) {
            res.status(400).json({ message: 'Cannot delete category as it is associated with one or more events.' });
            return;
        }

        await prisma.categories.delete({
            where: { id: categoryId },
        });

        res.status(200).json({ message: 'Category successfully deleted' });
    } catch (error:any) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};