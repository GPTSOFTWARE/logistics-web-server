import { NextFunction, Request, Response}  from "express";
import { getRepository } from "typeorm";
import { Account } from "../entity/Users";
import { USER_SECRET } from "../utils/constant";
const jwt = require('jsonwebtoken');

const checkRoles = async (req: Request, res: Response) => {

    if(!(req as any).user) return res.status(403).json({message : "Unauthorized"});
    const { userId } =(req as any).user;
    const findUser = await getRepository(Account).findOne(userId);
    console.log(findUser)
    if (findUser.role === "user"){
        return false;
    }
    else{
        return true;
    }

};

export default checkRoles;