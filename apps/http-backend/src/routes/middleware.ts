import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./route";
export function middleware(req: Request, res: Response, next: NextFunction) {

    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token, jwt_secret)


    if (decoded) {
        //@ts-ignore
        req.userId =decoded.userId
        next()
    } else {
    
        res.status(403).json({
            message:"unauthorized"
        })
        
    }
}
