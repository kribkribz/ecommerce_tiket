import { Router } from "express";

// Define Variable
const route = Router()

// Import organizer Controller
import * as organizerController from '../controllers/organizerController';
import { tokenVerifyOrganizer } from "../middleware/tokenVerifyOrganizer";

route.post('/register', organizerController.register)
route.post('/login', organizerController.login)
route.patch('/verified', tokenVerifyOrganizer, organizerController.verifiedAccount)

export default route
