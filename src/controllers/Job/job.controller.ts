import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { IJob, Job } from "../../entity/job";
import checkRoles from "../../middleware/role.middleware";
import { IGetJobQuery } from "../query.interface";

export const getJob = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const name = req?.query?.name || "";
    const [data, total] = await getRepository(Job)
        .createQueryBuilder("job")
        .where('job.nameJob ILIKE :name', {name : `%${name}%`})
        .orderBy('job.createdAt', 'DESC')
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};
export const getAllJob = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Job)
        .createQueryBuilder("job")
        .orderBy('job.createdAt', 'DESC')
        .getManyAndCount();
    return res.json({ total, data });
};

export const getJobById = async (
    req: Request<any, any, any, IGetJobQuery>,
    res: Response,
    next: NextFunction) => {

    try {
        const id = req.params.id;
        const job = await getRepository(Job).findOne(id);
        if(job){
            res.status(200).json(job);
        }
        else{
            res.status(404).json({ message: "Not Found"});
        }

    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }

};

export const createJob = async (
    req: Request<any, any, IJob, any>,
    res: Response,
    next: NextFunction) => {
    try {
        
        const check = await checkRoles(req, res);
        if(check){

            const data = req.body;
            const salaryB = Number(data.salaryBefore);
            const salaryA = Number(data.salaryAfter);
            const date1 = new Date();
            const date2 = new Date(data.expirationDate);
            if(data.nameJob == null||data.nameJob=="") {
                res.status(400).json({ message: " Please not empty name job"}); 

            }else if(isNaN(salaryB)||salaryB ==null||salaryA==null||isNaN(salaryA)||salaryB<0||salaryA<0)
            {
                res.status(400).json({ message: "Salary before & after  must be a number or not empty"});  
            }else if(date1 >= date2) {
                res.status(400).json({ message: "Invalid Date"});
                
            }else {
                
            const newJob = await createQueryBuilder()
                                    .insert()
                                    .into(Job)
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
        return res.status(500).json({message: "Internal Server Error"});
    }

};

export const updateJob = async (
    req: Request<any, any, IJob, any>,
    res: Response,
    next: NextFunction) => {
    try {

        const check = await checkRoles(req, res);
        if(check){
            const data = req.body;
            const salaryB = Number(data.salaryBefore);
            const salaryA = Number(data.salaryAfter);
            const date1 = new Date();//ngày tạo
            const date2 = new Date(data.expirationDate);//ngày hạn
     

            if(data.nameJob == null||data.nameJob=="") {
                res.status(400).json({ message: "Update fail please not empty name job"}); 

            }else if(isNaN(salaryB)||salaryB ==null||salaryA==null||isNaN(salaryA)||salaryB<0||salaryA<0)
            {
                res.status(400).json({ message: "Update fail salary before & after  must be a number or not empty "}); 
            }
            else if(date1 >= date2) {
                res.status(400).json({ message: "Invalid Date"});
                
            }else {
                const updateJob = await getRepository(Job)
                                        .createQueryBuilder('job')
                                        .update(Job)
                                        .set(data)
                                        .where('job.id = :id', { id: req.params.id })
                                        .execute();

                res.status(200).json({ message: "Update success" });
            }
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });

        }     
        
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }

};

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const check = await checkRoles(req, res);
        if(check){
            const job = await getRepository(Job).findOne(req.params.id);
            if(!job) {
                res.status(404).json({ message: "Not Found" });
            }
            const deleteOrder = await createQueryBuilder()
                                    .delete()
                                    .from(Job)
                                    .where("id = :id", { id: req.params.id })
                                    .execute();
            res.json({ message: "success" });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });

        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteMultiJob = async (req: Request, res: Response) => {
    try {
    
        const check = await checkRoles(req, res);
        if(check){
            const { idList } = req.body;
            const deleteUser = await createQueryBuilder()
                        .softDelete()
                        .from(Job)
                        .where("id IN(:...ids)", { ids: idList })
                        .execute();
            res.status(200).json({ message: "success" });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });

        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }
};
export const restoreJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if(check){
            const restoreOrder = await getRepository(Job).restore(req.params.id);
            res.json({ message: "success" });
        }
        else{
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({message: "Internal Server Error"});

    }
};
  