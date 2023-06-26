import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { IUser } from "../user/user.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status"

const createUser = catchAsync(
    async(req:Request, res:Response)=>{
        const {...userData} = req.body

        const result = await AuthService.createUser(userData)
        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User created successfully!',
            data: result,
          })
    }
)

export const AuthController = {
    createUser
}