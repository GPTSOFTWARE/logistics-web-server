import { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Driver, IDriver } from "../../entity/Driver";


const getDrivers = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(Driver)
        .createQueryBuilder("driver")
        .orderBy('driver.createdAt', 'DESC')
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};
const getAllDrivers = async (req: Request, res: Response): Promise<Response> => {
    const [data, total] = await getRepository(Driver)
        .createQueryBuilder("driver")
        .orderBy('driver.createdAt', 'DESC')
        .getManyAndCount();
    return res.json({ total, data });
};


const createDriver = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;

        const findDriver = await getRepository(Driver).findOne({ idenityCard: data.idenityCard });
        if (findDriver) {
            return res.send('Tài xế đã tồn tại');
        }
        const createDriver = await getRepository(Driver).create(data);
        const saveDriver = await getRepository(Driver).save(createDriver);

        res.status(201).json({ message: 'created' });
    }
    catch (err) {
        console.error(err);
    }
}

export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const driver = await getRepository(Driver).findOne(req.params.id);
        if (driver) {
            res.status(200).json(driver);
        }
        else {
            res.status(404).json({ message: "Not Found" });
        }
    }
    catch (err) {
        console.error(err);
    }
}

export const updateDriver = async (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
    try {

        const driver = await getRepository(Driver).findOne(req.params.id);
        if(!driver){
            res.status(404).send({ message: "Not Found" });
        }
        const data = req.body;
        const updateDriver = await createQueryBuilder('driver')
            .update(Driver)
            .set(data)
            .where('driver.id = :id', { id: req.params.id })
            .execute();
            res.status(200).json({ message: "update successful!" });
    }
    catch (err) {
        console.error(err);

    }
}

export const deleteDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { idList } = req.body;
        const deleteDriver = await createQueryBuilder()
            .softDelete()
            .from(Driver)
            .where("id IN(:...ids)", { ids: idList })
            .execute();
        res.status(200).json({ message: "success" });
    }

    catch (err) {
        console.error(err);
    }
}

export const restoreDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const restoreOrder = await getRepository(Driver).restore(req.params.id);
        res.status(200).json({ message: "success" });
    }
    catch (err) {
        console.log(err);
    }
}




//  
export { getDrivers, createDriver, getAllDrivers }