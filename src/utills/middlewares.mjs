import { mockUser } from "./constants.mjs";

export const resolvedUserId = (request, response, next)=>{
    const { params :{id}} = request;

    const parseID = parseInt(id);

    if(isNaN(parseID)) return response.sendStatus(400).send("invalid request");

    const findUserIndex = mockUser.findIndex((users)=> users.id === parseID);

    if(findUserIndex == -1) return response.sendStatus(400).send("invalid request");

    request.findUserIndex = findUserIndex;
    
    next();
}