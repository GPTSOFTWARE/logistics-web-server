import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Driver, IDriver } from "../../entity/Driver";


const getDrivers = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(Driver)
                .createQueryBuilder("driver")
                .take(page_size)
                .skip((page - 1) * page_size)
                .getManyAndCount();
    return res.json({ total, data });
};


const createDriver = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try{
        const data = req.body;
        const createDriver = await getRepository(Driver).create(data);
        const saveDriver = await getRepository(Driver).save(createDriver);

        res.status(200).json({message:'success'});
    }
    catch (err) {
        console.error(err);
    }
}

// export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
//     try{
//         const driver = await getRepository(Driver).findOne(req.params.id);
//         if(driver){
//             res.json(driver);
//         }
//         else{

//         }
//     }
// }

//  
export {getDrivers, createDriver }