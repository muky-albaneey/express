import { mockUser } from "../utills/constants.mjs";

export const getUserByIdHandler = (request, response)=>{
    
    const {findUserIndex} = request;   

    const findUser = mockUser[findUserIndex]; 

    if(!findUser) return response.sendStatus(404);

    return response.send(findUser);

}