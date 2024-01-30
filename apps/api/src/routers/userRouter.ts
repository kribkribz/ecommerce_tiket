import { Router } from "express";

// Define Variable
const route = Router()

// Import user Controller
import * as userController from '../controllers/userController';
import { tokenVerify } from "../middleware/tokenVerifyUsers";

route.post('/register', userController.register)
route.post('/login', userController.login)
route.patch('/verified', tokenVerify, userController.verifiedAccount)

export default route