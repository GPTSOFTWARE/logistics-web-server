// const User = require('../entity/User');
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Account } from "../../entity/Users";
import db from "../../utils/db";
import {
  comparePassword,
  generatorToken,
  hashPassword,
} from "../../utils/helpers";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const page = +req?.query?.page || 1;
  const page_size = +req?.query?.page_size || 10;
  const [data, total] = await (
    await db
  )
    .getRepository(Account)
    .createQueryBuilder("user")
    .take(page_size)
    .skip((page - 1) * page_size)
    .getManyAndCount();
  return res.json({ total, data });
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Account).findOne(req.params.id);
  return res.json(user);
};

// const createUser = async (req: Request, res: Response): Promise<Response> => {
//   const userData = req.body;
//   userData.password = await hashPassword(userData.password);
//   const newUser = await getRepository(Account).create(userData);
//   const result = await getRepository(Account).save(newUser);
//   return res.json(result);
// };

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Account).findOne(req.params.id);
  if (user) {
    getRepository(Account).merge(user, req.body); //get body request
    const result = await getRepository(Account).save(user);
    return res.json(result);
  }

  return res.status(404).json({ message: "User Not Found" });
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(Account).delete(req.params.id);
  return res.json(results);
};


export { getUsers , updateUser, deleteUser, getUserById};
