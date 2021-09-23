import { NextFunction, Request, Response } from "express";
import { getRepository, TreeRepositoryNotSupportedError } from "typeorm";
import { District } from "../../entity/district";


export const getDistrict = async (req: Request, res: Response): Promise<Response> => {

    const [data, total] = await getRepository(District)
        .createQueryBuilder("district")
        .leftJoinAndSelect('district.city', 'city')
        .getManyAndCount();
    return res.json({ total, data });

};


export const getDistrictById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {

    try {
        const id = req.params.id;
        const district = await getRepository(District)
            .createQueryBuilder('district')
            .where('id = :id', { id: id })
            .getOne();
        return res.status(200).json(district);
    }
    catch (err) {
        console.log(err);
    }

}

// export const getDistrictByProvince = async (req: Request, res: Response, next: NextFunction) => {

//     try{

//         const cityId = req.params.city;
//         const data = await getRepository(District)
//                     .createQueryBuilder('district')
//                     .where('district.city = :id',{id: cityId})
//                     .getMany();
//                     console.log(data);
//         return res.status(200).json(data);

//     }
//     catch(err){
//         console.log(err);
//     }
// };
