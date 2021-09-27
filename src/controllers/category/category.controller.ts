
import { Request, Response, NextFunction } from "express";
import { createQueryBuilder, getRepository, TreeRepositoryNotSupportedError } from "typeorm";
import { Category } from "../../entity/Category";

export const getCategory = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Category)
      .createQueryBuilder("category")
      .orderBy('user.name', 'DESC')
      .getManyAndCount();
    return res.json({ total, data });
};

// export const createCategory = async (req: Request, res: Response): Promise<Response> => {
//     try{

//     }
// }