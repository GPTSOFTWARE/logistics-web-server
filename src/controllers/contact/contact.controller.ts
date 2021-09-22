import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Contact, IContact } from "../../entity/contact";

export const getContact = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(Contact)
        .createQueryBuilder("contact")
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};
export const getAllContact = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Contact)
        .createQueryBuilder("contact")
        .getManyAndCount();
    return res.json({ total, data });
};

export const createContact = async (
    req: Request<any, any, IContact, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        const newContact = await createQueryBuilder()
            .insert()
            .into(Contact)
            .values(data)
            .execute();
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }

};