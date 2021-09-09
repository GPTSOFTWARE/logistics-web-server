// const User = require('../entity/User');
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
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
    .getRepository(User)
    .createQueryBuilder("user")
    .take(page_size)
    .skip((page - 1) * page_size)
    .getManyAndCount();
  return res.json({ total, data });
  return res.json("Get success")
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  return res.json(user);
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const userData = req.body;
  userData.password = await hashPassword(userData.password);
  const newUser = await getRepository(User).create(userData);
  const result = await getRepository(User).save(newUser);
  return res.json(result);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  if (user) {
    getRepository(User).merge(user, req.body); //get body request
    const result = await getRepository(User).save(user);
    return res.json(result);
  }

  return res.status(404).json({ message: "User Not Found" });
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const results = await getRepository(User).delete(req.params.id);
  return res.json(results);
};

// const postLogin = async (req: Request, res: Response): Promise<Response> => {
//   const username = req.body.username;
//   const password = req.body.password;

//   const user = await getRepository(User).findOne({ username });

//   if (!user) {
//     return res.status(404).send("Email is not found");
//   }

//   const validPassword = await comparePassword(user.password, password);

//   if (!validPassword) {
//     return res.status(404).json({ code: 404, message: 'login false' });
//   }
//   const token = await generatorToken(user);
//   res.status(200).json({ code: 200, token: token, message: 'login successful' });
// };

export { getUsers };
