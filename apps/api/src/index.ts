
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
require('dotenv').config({ path: './.env.development' });


const app: Express = express();
app.use(cors());


const port: any = 8000;


import route from "./routers";

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to Dashboard API</h1>");
});

app.use(route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    error: true,
    message: err.message || "Something Wrong!",
    data: null,
  });
});

app.listen(port, () => {
  console.log(`[SERVER] Server Running on Port ${port}`);
});
