// import { describe, it, beforeAll, beforeEach, test} from '@jest/globals';

import { getUserByIdHandler } from "../handlers/user.mjs"
import { mockUser } from "../utills/constants.mjs";

const mockRequest ={
    findUserIndex:1,
}

const mockResponse ={
    sendStatus: jest.fn(),
    send: jest.fn(),
};

describe('get user', () => {
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it('should get user by id',()=>{
        getUserByIdHandler(mockRequest, mockResponse);
        // expect(mockResponse.send).not.toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalled();
        expect(mockResponse.send).toHaveBeenCalledWith(mockUser[1]);
        expect(mockResponse.send).toHaveBeenCalledTimes(1);
    });

    it('it should call sendStatus 404 when user not found',()=>{
        const copyMockRequest = {...mockRequest, findUserIndex:100};
        getUserByIdHandler(copyMockRequest, mockResponse);
        expect(mockResponse.sendStatus).toHaveBeenCalled();
        expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
        expect(mockResponse.send).not.toHaveBeenCalled();
    });

})