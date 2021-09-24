import { Request, Response } from "express";
import { Product } from "../../entity/Product";
import { getRepository } from 'typeorm';
import { Account } from "../../entity/Users";

const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const page = +req?.query?.page || 1;
    const page_size = +req?.query?.page_size || 10;
    const [data, total] = await getRepository(Product)
        .createQueryBuilder("product")
        .leftJoinAndSelect('products.unit', 'unit_id')
        .orderBy('product.id', 'DESC')
        .take(page_size)
        .skip((page - 1) * page_size)
        .getManyAndCount();
    return res.json({ total, data });
};

const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const productData = req.body;
    const newProduct = await getRepository(Product).create(productData);
    const result = await getRepository(Product).save(newProduct);
    return res.json(result);
}

const getProductById = async (req: Request, res: Response): Promise<Response> => {

    const product = await getRepository(Product).findOne(req.params.id);
    return res.json(product);
}

const updateProduct = async (req: Request, res: Response): Promise<Response> => {

    const product = await getRepository(Product).findOne(req.params.id);
    if (product) {
        getRepository(Product).merge(product, req.body); //get body request
        const result = await getRepository(Product).save(product);
        return res.json(result);
    }

    return res.status(404).json({ message: "Product Not Found" });
}

//soft delete product
const removeProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
        await getRepository(Product)
            .createQueryBuilder("product")
            .where("product.id =:id", { id: req.params.id })
            .softDelete();
        return res.status(200).send('success');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }

}

//restore product
const restoreProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        await getRepository(Product)
            .createQueryBuilder()
            .where("id =:id", { id: req.params.id })
            .restore();
        return res.status(200).send('restored successful!');
    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');
    }
}

const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Product).delete(req.params.id);
    return res.json(results);
};

export { getProducts, createProduct, getProductById, updateProduct, deleteProduct, removeProduct, restoreProduct }