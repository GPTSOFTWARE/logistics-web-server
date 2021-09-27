
import { NextFunction, Request, Response } from "express";
import { Account } from "../../entity/Users";
import { USER_SECRET } from '../../utils/constant';
const jwt = require('jsonwebtoken');

import { getRepository } from 'typeorm';
import {
  comparePassword,
  generatorToken,
  hashPassword,
} from "../../utils/helpers";


export const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  const { userId } = (req as any).user
  const findUser = await getRepository(Account).findOne(userId);
  jwt.verify(token, USER_SECRET, (err) => {
    if (err) {
      return res.json({ message: "JWT Invalid", user: null }).status(403)
    } else {
      res.json({ message: "JWT Valid", user: findUser }).status(200)
    }
    next();
  })

}
export const checkJWTAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;
  const { userId } = (req as any).user
  const findUser = await getRepository(Account).findOne(userId);
  jwt.verify(token, USER_SECRET, (err) => {
    if (err) {
      return res.json({ message: "JWT Invalid", user: null }).status(403)
    } else {
      if (findUser.role === "user") {
        res.json({ message: "JWT Not Acceptable", user: null }).status(406)
      } else {
        res.json({ message: "JWT Valid", user: findUser }).status(200)
      }
    }
    next();
  })

}