import { Request, Response, NextFunction } from "express";

import { jwtVerify } from "./jwt";

interface IRequest extends Request {
    payload: any
}

export const tokenVerify = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Get Token from Headers
        const token: any = req.headers.authorization
        
        const payload: any = await jwtVerify(token)
        
        req.body = payload
        

        next()
    } catch (error: any) {
        res.status(400).send({
            error: true, 
            message: error.message, 
            data: null
        })
    }
}