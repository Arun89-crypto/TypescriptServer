import {Request,Response} from 'express'
import { CreateProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service';

export async function createProductHandler (req:Request<{}, {} ,CreateProductInput['body']>,res:Response) {
    try {
        const userID = res.locals.user._id;
        const body = req.body;
        const product = await createProduct({...body, user: userID})
        return res.send(product)
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductHandler (req:Request<UpdateProductInput['params']>,res:Response) {
    const userID = res.locals.user._id;

    const productId = req.params.productId;
    const update = req.body;

    const product = await findProduct({productId});

    if(!product){
        return res.sendStatus(404);
    }

    if(product.user !== userID){
        return res.sendStatus(403);
    }

    const updatedProduct = await findAndUpdateProduct({productId}, update, {new : true,});

    return res.send(updatedProduct);
}

export async function getProductHandler (req:Request<UpdateProductInput['params']>,res:Response) {
    const userID = res.locals.user._id;

    const productId = req.params.productId;
    const product = await findProduct({productId});

    if(!product){
        return res.sendStatus(404);
    }

    if(product.user !== userID){
        return res.sendStatus(403);
    }

    return res.send(product);

}

export async function deleteProductHandler (req:Request<UpdateProductInput['params']>,res:Response) {
    const userID = res.locals.user._id;

    const productId = req.params.productId;

    const product = await findProduct({productId});

    if(!product){
        return res.sendStatus(404);
    }

    if(product.user !== userID){
        return res.sendStatus(403);
    }

    await deleteProduct({productId});

    return res.sendStatus(200).json("Product Deleted successfully");
}