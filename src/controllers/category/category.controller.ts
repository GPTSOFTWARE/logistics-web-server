
import { Request, Response, NextFunction } from "express";
import { createQueryBuilder, getRepository, TreeRepositoryNotSupportedError } from "typeorm";
import { Category } from "../../entity/Category";
import checkRoles from "../../middleware/role.middleware";

export const getCategory = async (req: Request, res: Response): Promise<Response> => {

    const [data, total] = await getRepository(Category)
              .createQueryBuilder("category")
              .orderBy('category.name', 'DESC')
              .getManyAndCount();
    return res.json({ total, data });

};

export const createCategory = async (req: Request, res: Response) => {
    try{
        const check = await checkRoles(req, res);
        if(check){
          const data = req.body;
          const newCategory = await getRepository(Category).create(data);
                              await   getRepository(Category).save(newCategory);
  
          res.status(201).json({message : "created"});

        }
        else{
          return res.status(403).json({ message: "NOT PERMISTION" });
        }
    } 
    catch(err){
      return res.status(500).json({message: "Internal Server Error"});

    }
}