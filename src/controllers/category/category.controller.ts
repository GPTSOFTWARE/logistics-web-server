
import { Request, Response, NextFunction } from "express";
import { createQueryBuilder, getRepository, TreeRepositoryNotSupportedError } from "typeorm";
import { Category } from "../../entity/Category";

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Category)
      .createQueryBuilder("category")
      .orderBy('category.name', 'DESC')
      .getManyAndCount();
    return res.json({ total, data });
};

export const createCategory = async (req: Request, res: Response) => {
    try{
        const data = req.body;
        const newCategory = await getRepository(Category).create(data);
                            await   getRepository(Category).save(newCategory);

        res.status(201).json({message : "created"});
    } 
    catch(err){
      console.log(err);
    }
}