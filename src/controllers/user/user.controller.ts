// const User = require('../entity/User');
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Account } from "../../entity/Users";
import {
  comparePassword,
  generatorToken,
  hashPassword,
} from "../../utils/helpers";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const page = +req?.query?.page || 1;
  const page_size = +req?.query?.page_size || 10;
  const [data, total] = await getRepository(Account)
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

const login = async (req: Request, res: Response): Promise<Response> => {

  const phone = req.body.phone;
  const password = req.body.password;

  const user = await getRepository(Account).findOne({ phone });

    if (!user) {
      return res.status(404).send("Phone number is not found");
    }
  
    const validPassword = await comparePassword(user.password, password);
  
    if (!validPassword) {
      return res.status(404).json({ code: 404, message: 'login false' });
    }
    const token = await generatorToken(user);
    res.status(200).json({ code: 200, token: token, message: 'login successful' });

}


const register = async (req: Request, res: Response):Promise<Response> => {

  const userData = req.body;
  

  var checkPhone = await getRepository(Account).findOne({phone: userData.phone});
  
  if(checkPhone){
      return res.status(400).send('Phone number already exists!');
  }


  userData.password = await hashPassword(userData.password);
  const newUser = await getRepository(Account).create(userData);
  const saveUser = await getRepository(Account).save(newUser);
  return res.status(200).json(saveUser);
};

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {

  const phone = req.body.phone;
  const password = req.body.password;

  const user = await getRepository(Account).findOne({ phone });

  if (!user) {
      return res.status(404).send("Phone number is not found");
  }
  
  const validPassword = await comparePassword(user.password, password);
  
  if (!validPassword) {
      return res.status(404).json({ code: 404, message: 'wrong password' });
  }

  if(user.role.valueOf() === 'admin'){

    const token = await generatorToken(user);
    res.status(200).json({ code: 200, token: token, message: 'login successful' });

  }
  else{
      res.send("You are not allowed");
  }

};

export const changePassword = async (req: Request, res: Response) =>{
}


export { getUsers, updateUser, deleteUser, getUserById, login, register};
