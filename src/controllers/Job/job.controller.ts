import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { createQueryBuilder, getRepository } from "typeorm";
import { IJob, Job } from "../../entity/job";
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
        console.log(err);
    }

};

export const createJob = async (
    req: Request<any, any, IJob, any>,
    res: Response,
    next: NextFunction) => {
    try {
        
        const data = req.body;
        const salaryB = Number(data.salaryBefore);
        const salaryA = Number(data.salaryAfter);
        const date1 = new Date();
        const date2 = new Date(data.expirationDate);
        if(data.nameJob == null||data.nameJob=="") {
            res.status(400).json({ message: " please not empty name job"}); 

        }else if(isNaN(salaryB)||salaryB ==null||salaryA==null||isNaN(salaryA)||salaryB<=0||salaryA<=0)
        {
            res.status(400).json({ message: "salary before & after  must be a number or not empty"});  
        }else if(date1 >= date2) {
            res.status(400).json({ message: "Invalid Date"});
            
        }
        

        const newJob = await createQueryBuilder()
            .insert()
            .into(Job)
            .values(data)
            .execute();
        res.status(201).json({ message: "created" });
    }
    catch (err) {
        console.log(err);
    }

};

export const updateJob = async (
    req: Request<any, any, IJob, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        const salaryB = Number(data.salaryBefore);
        const salaryA = Number(data.salaryAfter);
        const date1 = new Date();
        const date2 = new Date(data.expirationDate);
     

        if(data.nameJob == null||data.nameJob=="") {
            res.status(400).json({ message: "update fail please not empty name job"}); 

        }else if(isNaN(salaryB)||salaryB ==null||salaryA==null||isNaN(salaryA)||salaryB<=0||salaryA<=0)
        {
            res.status(400).json({ message: "update fail salary before & after  must be a number or not empty "}); 
        }
        else if(date1 >= date2) {
            res.status(400).json({ message: "Invalid Date"});
            
        }
        const updateJob = await getRepository(Job)
            .createQueryBuilder('job')
            .update(Job)
            .set(data)
            .where('job.id = :id', { id: req.params.id })
            .execute();

        res.status(200).json({ message: "update success" });
    }
    catch (err) {
        console.log(err);
    }

};

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {

    try {
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
    catch (err) {
        console.log(err);
    }
}

export const deleteMultiJob = async (req: Request, res: Response) => {
    try {
  
      const { idList } = req.body;
      const deleteUser = await createQueryBuilder()
        .softDelete()
        .from(Job)
        .where("id IN(:...ids)", { ids: idList })
        .execute();
      res.status(200).json({ message: "success" });
    }
    catch (err) {
      console.error(err);
    }
  }

  export const restoreJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
  
      const restoreOrder = await getRepository(Job).restore(req.params.id);
      res.json({ message: "success" });
    }
    catch (err) {
      console.log(err);
    }
  }
  