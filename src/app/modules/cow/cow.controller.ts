import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { paginationField } from "../../../constant/paginationField";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { cowFilterableField } from "./cow.constant";
import { CowService } from "./cow.service";
import { ICow } from "./cow.interface";

const createCow = catchAsync(
    async(req:Request, res:Response)=>{
        const cowData = req.body

        const result = await CowService.createCow(cowData)

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow created successfully!',
            data: result,
          })
    }
)

const getAllCow = catchAsync(
    async(req:Request, res:Response)=>{
        const filters = pick(req.query, cowFilterableField)
        const paginationOptions = pick(req.query, paginationField)


        const result = await CowService.getAllCow(filters, paginationOptions)

        sendResponse<ICow[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow retrived successfully!',
            meta: result.meta,
            data: result.data,
          })
    }
)


const getSingleCow = catchAsync(
    async(req:Request, res:Response)=>{
        const id = req.params.id

        const result = await CowService.getSingleCow(id)

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow retrive successfully!',
            data: result,
          })
    }
)

const updateCow = catchAsync(
    async(req:Request, res:Response)=>{
        const id= req.params.id
        const updatedData= req.body

        const result = await CowService.updateCow(id, updatedData)

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow update successfully!',
            data: result,
          })


    }
)

const deleteCow = catchAsync(
    async(req:Request, res:Response)=>{
        const id= req.params.id

        const result = await CowService.deleteCow(id)

        sendResponse<ICow>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Cow delete successfully!',
            data: result,
        })
    }
)

export const CowController = {
    createCow,
    getAllCow,
    getSingleCow,
    updateCow,
    deleteCow
}