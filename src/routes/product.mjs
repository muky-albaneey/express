import { Router } from "express";
import { productModel } from "../mongoose/schema/product.mjs";
import { query, checkSchema, validationResult, matchedData } from 'express-validator';
import {productValidationSchema} from '../utills/validationSchema.mjs'



const router = Router();


router.post('/api/product', checkSchema(productValidationSchema), async(request, response)=>{

    const result = validationResult(request);

    if(!result.isEmpty()) return response.status.send(result.array());

    const data = matchedData(request);

    const newProduct = new productModel(data);

    try {
        const savedProduct = await newProduct.save();

        return response.status(201).send(savedProduct)
        
    } catch (error) {

        console.log(error);
        return response.sendStatus(400);
    }
}); 

router.get('/api/products', (request, response)=>{

        console.log(request.headers.cookie);
        console.log(request.signedCookies);

        if(request.signedCookies.hello && request.signedCookies.hello ==='world') 
            return response.send([ {id:123, name:'rice', price:2000},]);
        
        return response.status(403).send({msg: 'you need a correct cookie!'});
    }); 

export default router;