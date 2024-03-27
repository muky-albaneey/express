import {Router} from 'express';
import { query, checkSchema, validationResult, matchedData } from 'express-validator';
import { mockUser } from "../utills/constants.mjs";
import {createUserValidationSchema} from '../utills/validationSchema.mjs'
import { resolvedUserId } from '../utills/middlewares.mjs';
import  {UserModel} from '../mongoose/schema/user.mjs';
import { hashedPassword } from '../utills/helpers.mjs';
import { getUserByIdHandler } from '../handlers/user.mjs';

const router = Router();

router.get("/api/prophets", 
query('filter').isString().notEmpty().withMessage('must not be empty')
.isLength({min:3, max:10}).withMessage('must be at least 3- 10 characters'), 
(request, response)=>{
    
    const result = validationResult(request);
    console.log(result);
    
    console.log(request.session);
    console.log(request.session.id);

    request.sessionStore.get(request.session.id, (err, sessionData)=>{
        if(err){
            console.log(err);
        }

        console.log(sessionData);
    });
    const {query :{filter, value}} = request;

    if(filter && value) return response.send(mockUser.filter((names)=> names[filter].includes(value)))
   
    return response.send(mockUser);
});


router.get("/api/prophets/:id", resolvedUserId,getUserByIdHandler);

router.post('/api/user', 
checkSchema(createUserValidationSchema),
async (request, response) =>{   

    const result = validationResult(request);
  

    if(!result.isEmpty()) return response.status(400).send(result.array());

    // const {body} = request;

    const data = matchedData(request);

    data.password = hashedPassword(data.password);

    const newUser = new UserModel(data);
    console.log(data);
    try {

        const savedUser = await newUser.save();
        return response.status(201).send(savedUser);

    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }

    // const result = validationResult(request);    

    // if(!result.isEmpty())
    //     return response.status(400).send({errors : result.array()})
    
    // const data = matchedData(request);
    // // console.log(data);

    // const { body} = request;
    // // console.log( mockUser[mockUser.length -1].id)

    // const newUser = {id: mockUser[mockUser.length -1].id +1, ...data}
    // mockUser.push(newUser)
    // // console.log(mockUser.push(newUser));
    // console.log(newUser);

    // return response.status(201).send(newUser);

});

router.put("/api/prophets/:id", resolvedUserId, (request, response)=>{

    const { body, findUserIndex } = request;

     mockUser[findUserIndex] = {id : mockUser[findUserIndex].id, ...body};

     return response.sendStatus(200);
});

router.patch("/api/prophets/:id", resolvedUserId, (request, response)=>{
    const {body, findUserIndex} = request;
    
    mockUser[findUserIndex] = {...mockUser[findUserIndex], ...body};

    return response.sendStatus(200);
});


router.delete("/api/prophets/:id",resolvedUserId, (request, response)=>{
    
    // const {params:{id}} = request;
    const {findUserIndex} = request;


    mockUser.splice(findUserIndex, 1);

    return response.sendStatus(200);

});


export default router;