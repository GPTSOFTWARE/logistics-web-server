import e, { NextFunction, Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Driver, IDriver } from "../../entity/Driver";
import checkRoles from "../../middleware/role.middleware";


const getDrivers = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const check = await checkRoles(req, res);
    if (check) {
        const [data, total] = await getRepository(Driver)
            .createQueryBuilder("driver")
            .orderBy('driver.createdAt', 'DESC')
            .take(page_size)
            .skip((page - 1) * page_size)
            .getManyAndCount();
        return res.json({ total, data });
    }
    else {
        return res.status(403).json({ message: "NOT PERMISTION" });
    }
};
const getAllDrivers = async (req: Request, res: Response): Promise<Response> => {

    const check = await checkRoles(req, res);
    if (check) {
        const [data, total] = await getRepository(Driver)
            .createQueryBuilder("driver")
            .orderBy('driver.createdAt', 'DESC')
            .getManyAndCount();
        return res.json({ total, data });
    }
    else {
        return res.status(403).json({ message: "NOT PERMISTION" });

    }
};

const createDriver = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction) => {
    try {
        const data = req.body;
        const check = await checkRoles(req, res);
        if (check) {
            const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g; //phone number chuẩn
            console.log({ data });

            if (data.name === null || data.name === "") {
                res.status(400).json({ message: "Name is not empty" });
            }
            else if (!vnf_regex.test(data.phone)) {
                res.status(400).json({ message: "Invalid phone number" });
            } else if (isNaN(data.age)) {
                res.status(400).json({ message: "Invalid age" });
            } else if (data.idenityCard?.length > 9 || data.idenityCard?.length < 9 || data.idenityCard == null) {
                res.status(400).json({ message: "Invalid idenityCard" });
            } else {

                const findDriver = await getRepository(Driver).findOne({ idenityCard: data.idenityCard });
                if (findDriver) {
                    return res.send('Tài xế đã tồn tại');
                }
                const createDriver = await getRepository(Driver).create(data);
                const saveDriver = await getRepository(Driver).save(createDriver);

                res.status(201).json({ message: 'created' });
            }
        }
        else {
            return res.status(403).json({ message: "NOT PERMISTION" });

        }

    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

export const getDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if (check) {
            const driver = await getRepository(Driver).findOne(req.params.id);
            if (driver) {
                res.status(200).json(driver);
            }
            else {
                res.status(404).json({ message: "Not Found" });
            }
        }
        else {
            return res.status(403).json({ message: "NOT PERMISTION" });

        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateDriver = async (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {
    try {

        const check = await checkRoles(req, res);
        if (check) {
            const driver = await getRepository(Driver).findOne(req.params.id); // tìm kiềm theo id;
            if (!driver) {
                res.status(404).send({ message: "Not Found" });
            }
            const data = req.body;
            const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g; //phone number chuẩn
            if (data.name == null || data.name == "") {
                res.status(400).json({ message: "update fail Name is not empty" });
            }
            else if (!vnf_regex.test(data.phone)) {
                res.status(400).json({ message: "update fail Invalid Phone number" });
            } else if (isNaN(data.age)) {
                res.status(400).json({ message: "update fail invalid age" });
            } else {
                const updateDriver = await createQueryBuilder('driver')
                    .update(Driver)
                    .set(data)
                    .where('driver.id = :id', { id: req.params.id })
                    .execute();
                res.status(200).json({ message: "update successful!" });
            }
        }
        else {
            return res.status(403).json({ message: "NOT PERMISTION" });

        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if (check) {
            const { idList } = req.body;
            const deleteDriver = await createQueryBuilder()
                .softDelete()
                .from(Driver)
                .where("id IN(:...ids)", { ids: idList })
                .execute();
            res.status(200).json({ message: "success" });
        }
        else {
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const restoreDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const check = await checkRoles(req, res);
        if (check) {
            const restoreOrder = await getRepository(Driver).restore(req.params.id);
            res.status(200).json({ message: "success" });
        }
        else {
            return res.status(403).json({ message: "NOT PERMISTION" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });

    }
}




//  
export { getDrivers, createDriver, getAllDrivers }