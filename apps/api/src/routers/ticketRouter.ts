import { Router } from "express";
import * as ticketController from '../controllers/ticketController';

import { tokenVerify } from "../middleware/tokenVerifyUsers";
import { tokenVerifyOrganizer } from "../middleware/tokenVerifyOrganizer";


const router = Router();


router.post('/purchase-ticket', tokenVerify, ticketController.purchaseTicket);

router.get('/user-tickets/:userId', tokenVerify, ticketController.viewUserTickets);

router.get('/event-summary/:eventId', tokenVerifyOrganizer, ticketController.eventSummary);


export default router;