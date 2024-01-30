import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../utils/jwt';



export const tokenVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token: any = req.headers.authorization;
 
    const payload: any = await jwtVerify(token);
 
    

    if (payload.role !== 'USER') throw { message: 'Access Denied' };

    (req as any ).payload = payload

 

    next();
  } catch (error: any) {
    res.status(400).send({
      error: true,
      message: error.message,
      data: null,
    });
  }
};
