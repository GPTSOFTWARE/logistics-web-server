import { NextFunction, Request, Response}  from "express";
import { getRepository } from "typeorm";
import { Account } from "../entity/Users";
import { USER_SECRET } from "../utils/constant";
const jwt = require('jsonwebtoken');

const checkAdmin = async (req: any, res: Response, next: NextFunction) => {

    if (!req.user) return res.status(403).json({ message: `Unauthorization` });
    const { userId } =(req as any).user;
    const findUser = await getRepository(Account).findOne(userId);
    console.log(findUser)
    if (findUser.role === "user")
        return res.status(400).json({ message: `doesn't have permession` });
    next();
   
};

export default checkAdmin;