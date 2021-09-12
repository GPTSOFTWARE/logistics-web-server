<<<<<<< HEAD
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
=======
import {Request, Response} from "express";
import { getRepository, TreeRepositoryNotSupportedError } from "typeorm";
import { Account } from "../../entity/Users";
import db from "../../utils/db";
import {
    comparePassword,
    generatorToken,
    hashPassword,
} from "../../utils/helpers";
import { getProducts } from "../product/product.controller";

export const login = async (req: Request, res: Response): Promise<Response> => {

    const phone = req.body.phone;
    const password = req.body.password;

    const user = await getRepository(Account).findOne({ phone });

      if (!user) {
        return res.status(404).send("Phone number is not found");
>>>>>>> d7101d74a8ea1c1130e7f0189340daa0228df289
      }
    
      const validPassword = await comparePassword(user.password, password);
    
      if (!validPassword) {
<<<<<<< HEAD
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
=======
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


    userData.password = await hashPassword(userData.password);
    const newUser = await getRepository(Account).create(userData);
    const saveUser = await getRepository(Account).save(newUser);
    return res.status(200).json(saveUser);
};

export const changePassword = async (req: Request, res: Response) =>{
}
>>>>>>> d7101d74a8ea1c1130e7f0189340daa0228df289
