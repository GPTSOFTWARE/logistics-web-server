import e, { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { IRequestOrder, RequestOrder } from "../../entity/RequestOrder";
import checkRoles from "../../middleware/role.middleware";


export const getRequest = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const check = await checkRoles(req, res);
    if(check){
        const [data, total] = await getRepository(RequestOrder)
                    .createQueryBuilder("request")
                    .take(page_size)
                    .orderBy('request.createdAt', 'DESC')
                    .skip((page - 1) * page_size)
                    .getManyAndCount();
        return res.json({ total, data });   
    }
    else{
        return res.status(403).json({ message: "NOT PERMISTION" });
    }
};
export const getAllRequest = async (req: Request, res: Response): Promise<Response> => {
    const check = await checkRoles(req, res);
    if(check){
        const [data, total] = await getRepository(RequestOrder)
                                    .createQueryBuilder("request")
                                    .orderBy('request.createdAt', 'DESC')
                                    .getManyAndCount();
        return res.json({ total, data });
    }
    else{
        return res.status(403).json({ message: "NOT PERMISTION" });

    }
};

export const createRequest = async (
    req: Request<any, any, IRequestOrder, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        const mailFormat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email format chuẩn
        
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g; //phone number chuẩn


        const check = await checkRoles(req, res);
        if(check){
            if (data.fullname== null || data.fullname==""){
                res.status(400).json({ message: "Name is not empty"});
            }else if(!vnf_regex.test(data.phone)){
                res.status(400).json({message:"Invalid Phone number"});
            }else if(!mailFormat.test(data.email)){
                res.status(400).json({message:"Invalid Email"});
            }else {
                const newRequestOrder = await createQueryBuilder()
                                            .insert()
                                            .into(RequestOrder)
                                            .values(data)
                                            .execute();
                    res.status(201).json({ message: "created" });
            }
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });

        }
        
    }
    catch (err) {
        console.log(err);
    }

};