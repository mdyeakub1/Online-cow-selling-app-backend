import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableField } from "./user.constant";
import { paginationField } from "../../../constant/paginationField";
import { IUser } from "./user.interface";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const getAllUser = catchAsync(
    async(req:Request, res:Response)=>{
        const filters = pick(req.query, userFilterableField)
        const paginationOptions = pick(req.query, paginationField)


        const result = await UserService.getAllUser(filters, paginationOptions)

        sendResponse<IUser[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrived successfully!',
            meta: result.meta,
            data: result.data,
          })
    }
)


const getSingleUser = catchAsync(
    async(req:Request, res:Response)=>{
        const id = req.params.id

        const result = await UserService.getSingleUser(id)

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User retrive successfully!',
            data: result,
          })
    }
)

const updateUser = catchAsync(
    async(req:Request, res:Response)=>{
        const id= req.params.id
        const updatedData= req.body

        const result = await UserService.updateUser(id, updatedData)

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User update successfully!',
            data: result,
          })


    }
)

const deleteUser = catchAsync(
    async(req:Request, res:Response)=>{
        const id= req.params.id

        const result = await UserService.deleteUser(id)

        sendResponse<IUser>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User delete successfully!',
            data: result,
        })
    }
)

export const UserController = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}