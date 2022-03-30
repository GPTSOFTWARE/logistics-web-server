import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Status } from "../../entity/Status";
import checkRoles from "../../middleware/role.middleware";

export const getAllStatus = async (req: Request, res: Response): Promise<Response> => {
    
    const check = await checkRoles(req, res);
    if(check)
    {
        const [data, total] = await getRepository(Status)
                        .createQueryBuilder("status")
                        .getManyAndCount();
            return res.json({ total, data });
    }
    else{
        return res.json({ message: "NOT PERMISTION" }).status(403);
        
    }
};
