import { Router } from "express";

// Define Variable
const route = Router();

// Import Event Controller
import * as EventController from '../controllers/eventController';
import { tokenVerifyOrganizer } from "../middleware/tokenVerifyOrganizer";
import { UploadValidator } from "../middleware/uploadValidator";

// Event Routes
route.post('/create-event', tokenVerifyOrganizer, UploadValidator, EventController.createEvent);
route.delete('/delete/:eventId', tokenVerifyOrganizer, EventController.deleteEvent);
route.get('/get', EventController.findEvents);

export default route;
