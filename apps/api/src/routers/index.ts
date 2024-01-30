import express, { Router } from "express";
require('dotenv').config({ path: './.env.development' });
// Define Variable
const route = Router()
// Body Parser
route.use(express.json())

// Import All Router
import organizerRouter from './organizerRouter';
import userRouter from './userRouter'
import evenRouter from './eventRouter'
import ticketRouter from "./ticketRouter"
import categoriesRouter from "./categoriesRouter"
import reviewRouter from "./reviewRouter"



route.use('/organizer', organizerRouter)
route.use('/user', userRouter)
route.use('/event', evenRouter)
route.use('/ticket', ticketRouter)
route.use('/categories', categoriesRouter)
route.use('/review', reviewRouter)

export default route    