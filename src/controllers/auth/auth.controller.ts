import {Request, Response} from "express";
import { getRepository } from "typeorm";
import { Account } from "../../entity/Users";
import db from "../../utils/db";
import {
    comparePassword,
    generatorToken,
    hashPassword,
} from "../../utils/helpers";

export const login = async (req: Request, res: Response): Promise<Response> => {

    const phone = req.body.phone;
    const password = req.body.password;

    const user = await getRepository(Account).findOne({ phone });

      if (!user) {
        return res.status(404).send("Phone number is not found");
      }
    
      const validPassword = await comparePassword(user.password, password);
    
      if (!validPassword) {
        return res.status(404).json({ code: 404, message: 'login failed' });
      }
      const token = await generatorToken(user);
      res.status(200).json({ code: 200, token: token, message: 'login successful' });
};

export const register = async (req: Request, res: Response):Promise<Response> => {

    const userData = req.body;
    

    var checkPhone = await getRepository(Account).findOne({phone: userData.phone});
    
    if(checkPhone){
        return res.status(400).send('Phone number already exists!');
    }


    // hash password
    userData.password = await hashPassword(userData.password);
    const newUser = await getRepository(Account).create(userData);
    const saveUser = await getRepository(Account).save(newUser);
    return res.json(saveUser);
}

export const changePassword = async (req: Request, res: Response) =>{
}
