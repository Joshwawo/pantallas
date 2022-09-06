import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../config.js'


export const verifyToken = async (req, res, next) => {
    // try {
        const token = req.headers["x-access-token"];
        if (!token) {
           return res.status(403).json({message: "No token provided", auth:false, message2:"No sea metiche"})
        } ;
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    // } catch (error) {
    //     return res.status(401).json({message: "Unauthorized!"});
    // }
}