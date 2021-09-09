import { Request, Response} from "express";
import {getRepository} from "typeorm";
import { User } from "../../entity/User";
import db from "../../utils/db";
import {
  comparePassword,
  generatorToken,
  hashPassword,
} from "../../utils/helpers";

export const userLogin = async (req: Request, res: Response): Promise<Response> => {
    const email = req.body.email;
      const password = req.body.password;
    
      const user = await getRepository(User).findOne({ email });
    
      if (!user) {
        return res.status(404).send("Email is not found");
      }
    
      const validPassword = await comparePassword(user.password, password);
    
      if (!validPassword) {
        return res.status(404).json({ code: 404, message: 'login false' });
      }
      const token = await generatorToken(user);
      res.status(200).json({ code: 200, token: token, message: 'login successful' });

}

export const register = async (req: Request, res: Response): Promise<Response> => {
     var userData = req.body;

     var user = await getRepository(User).findOne(userData.email); // check email invalid

     if(user){
            return res.status(400).send('Email already exists !');
     }
     try{
            userData.password = await hashPassword(userData.password);
     }
     catch{}

     const newUser = await getRepository(User).create(userData);
     const result = await getRepository(User).save(newUser);

     res.status(200).send('Resgister Successfully!');



}