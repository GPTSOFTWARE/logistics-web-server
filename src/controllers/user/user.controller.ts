// const User = require('../entity/User');
import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository, Not } from "typeorm";
import { Account } from "../../entity/Users";
import checkRoles from "../../middleware/role.middleware";
import {
  comparePassword,
  generatorToken,
  hashPassword,
} from "../../utils/helpers";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const page = +req?.query?.page || 1;
  const page_size = +req?.query?.page_size || 10;

  const check = await checkRoles(req, res);
  console.log({ check });
  if (check) {
    const [data, total] = await getRepository(Account)
      .createQueryBuilder("user")
      .orderBy('user.createdAt', 'DESC')
      .take(page_size)
      .skip((page - 1) * page_size)
      .getManyAndCount();
    return res.json({ total, data });
  } else {
    return res.json({ message: "NOT PERMISTION" }).status(403);
  }


};
const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const check = await checkRoles(req, res);
  if(check){
    const [data, total] = await getRepository(Account)
    .createQueryBuilder("user")
    .orderBy('user.createdAt', 'DESC')
    .getManyAndCount();
    return res.json({ total, data });
  }
  else {
    return res.json({ message: "NOT PERMISTION" }).status(403);
  }

};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await getRepository(Account).findOne(req.params.id);
    return res.status(200).json(user);
  }
  catch (err) {
    console.log(err);
    res.status(400).send("Not Found");
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {

  try {
    const user = await getRepository(Account).findOne(req.params.id);
    if (user) {
      getRepository(Account).merge(user, req.body); //get body request
      const result = await getRepository(Account).save(user);
      return res.json(result);
    }
    else {
      res.status(400).send("Not Found");
    }
  }
  catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  
  const check = await checkRoles(req, res);
  if(check){
    const results = await getRepository(Account).delete(req.params.id);
    return res.status(200).json({message: "delete success"});
  }
  else{
    return res.json({ message: "NOT PERMISTION" }).status(403);
  }

};

export const deleteMultiUser = async (req: Request, res: Response) => {
  try {
    const check = await checkRoles(req, res);
    if(check){
      const { idList } = req.body;
      const deleteUser = await createQueryBuilder()
        .softDelete()
        .from(Account)
        .where("id IN(:...ids)", { ids: idList })
        .execute();
      res.status(200).json({ message: "success" });
    }
    else{
      return res.json({ message: "NOT PERMISTION" }).status(403);
    }
  }
  catch (err) {
    console.error(err);
  }
}

export const restoreUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const check = await checkRoles(req, res);
    if(check){
      const restoreOrder = await getRepository(Account).restore(req.params.id);
      res.status(200).json({ message: "success" });
    }
    else{
      return res.json({ message: "NOT PERMISTION" }).status(403);
    }
  }
  catch (err) {
    console.log(err);
  }
}


const login = async (req: Request, res: Response): Promise<Response> => {

  const phone = req.body.phone;
  const password = req.body.password;

  const user = await getRepository(Account).findOne({ phone });

  if (!user) {
    return res.status(404).send("Phone number is not found");
  }

  const validPassword = await comparePassword(user.password, password);

  if (!validPassword) {
    return res.status(400).json({ code: 404, message: 'login false' });
  }
  const token = await generatorToken(user);
  res.status(200).json({ code: 200, token: token, user, message: 'login successful', name: user.fullname });

}


const register = async (req: Request, res: Response): Promise<Response> => {

  try {
    const userData = req.body;
    var checkPhone = await getRepository(Account).findOne({ phone: userData.phone });

    if (checkPhone) {
      return res.status(400).send('Phone number already exists!');
    }

    userData.password = await hashPassword(userData.password);
    const newUser = await getRepository(Account).create(userData);
    const saveUser = await getRepository(Account).save(newUser);
    return res.status(200).json(saveUser);
  }
  catch (err) {
    console.log(err);
  }

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
    return res.status(400).json({ code: 400, message: 'Password not match' });
  }

  if (user.role.valueOf() === 'admin' || user.role.valueOf() === 'manage') {

    const token = await generatorToken(user);
    res.status(200).json({ code: 200, token: token, user, message: 'Login successful' });

  }
  else {
    res.status(403).send("You are not allowed");
  }

};

export const changePassword = async  (req: Request, res: Response, next: NextFunction) => {

  try {

    const id = req.params.id;
    //get parameters from body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }
    //find user by id
    const user = await getRepository(Account).findOneOrFail(id);
    const hashNewPassword = await hashPassword(newPassword);
    if (user) {
      const validPassword = await comparePassword(user.password, oldPassword);
      if (validPassword) {
        const updateUser = await createQueryBuilder()
          .update(Account)
          .set({
            password: hashNewPassword
          })
          .where('id = :id', { id: id })
          .execute();
        res.status(200).send('change password successful');
      }
      else {
        res.status(400).send('old password incorrect');
      }
    }
    else {
      return res.status(404).send('NOT FOUND');
    }
  }
  catch (err) {
    console.log(err);
  }

}


export { getUsers, updateUser, deleteUser, getUserById, login, register, getAllUsers };
