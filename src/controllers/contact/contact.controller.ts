import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Contact, IContact } from "../../entity/contact";
import checkRoles from "../../middleware/role.middleware";

export const getContact = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;

    const check = await checkRoles(req, res);
    if(check){
        const [data, total] = await getRepository(Contact)
                        .createQueryBuilder("contact")
                        .orderBy('contact.id', 'DESC')
                        .take(page_size)
                        .skip((page - 1) * page_size)
                        .getManyAndCount();
            return res.json({ total, data });
    }
    else{
        return res.status(403).json({ message: "NOT PERMISTION" });
    }
};
export const getAllContact = async (req: Request, res: Response): Promise<Response> => {
    const check = await checkRoles(req, res);
    if(check){
        const [data, total] = await getRepository(Contact)
                            .createQueryBuilder("contact")
                            .orderBy('contact.id', 'DESC')
                            .getManyAndCount();
            return res.json({ total, data });
    }
    else{
        return res.status(403).json({ message: "NOT PERMISTION" });
    }
};

export const createContact = async (
    req: Request<any, any, IContact, any>,
    res: Response,
    next: NextFunction) => {
    try {

            
            //
            const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;     //email format chuẩn    
            const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g; //phone number chuẩn
            const data = req.body;
            
            
            if(!vnf_regex.test(data.phone)){
                res.status(400).json({message:"Invalid Phone number"});
            }
            else if(!mailFormat.test(data.email)){
               res.status(400).json({message:"Invalid Email"})
            }
            else if(data.fullname ==""||data.fullname==null){
                 res.status(400).json({message:"Please not empty your name"});
    
            }else{
                    const newContact = await createQueryBuilder()
                                    .insert()
                                    .into(Contact)
                                    .values(data)
                                    .execute();
                res.status(201).json({ message: "Created" });
           }      
        
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }

};