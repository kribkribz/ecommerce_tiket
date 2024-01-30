import express from 'express';
import {createCategory, deleteCategory} from '../controllers/categoryController';
import { tokenVerifyOrganizer } from '../middleware/tokenVerifyOrganizer';
const route = express.Router();

// Route to create a new category
route.post('/create', createCategory, tokenVerifyOrganizer );

// Route to delete a category
route.delete('/delete/:categoryId', deleteCategory, tokenVerifyOrganizer );

export default route;