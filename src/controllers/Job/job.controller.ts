import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { IJob, Job } from "../../entity/job";
import { IGetJobQuery } from "../query.interface";

export const getJob = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(Job)
        .createQueryBuilder("job")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};
export const getAllJob = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Job)
        .createQueryBuilder("job")
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
        res.status(200).json(job);

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
        const newJob = await createQueryBuilder()
            .insert()
            .into(Job)
            .values(data)
            .execute();
        res.status(200).json({ message: "success" });
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
  