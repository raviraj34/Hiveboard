import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
    console.log("Headers received:", req.headers);

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  console.log("Secret used:", jwt_secret);
  
  // Format: "Bearer <token>"
  const token = authHeader.split(" ")[1];
  console.log("Received token:", token);

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);

    // Attach to request
    // @ts-ignore
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
