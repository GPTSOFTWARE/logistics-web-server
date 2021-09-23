import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Status } from "../../entity/Status";

export const getAllStatus = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Status)
        .createQueryBuilder("status")
        .getManyAndCount();
    return res.json({ total, data });
};
