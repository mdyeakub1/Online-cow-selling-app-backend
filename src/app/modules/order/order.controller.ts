import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { IOrder } from "./order.interface"
import pick from "../../../shared/pick"
import { orderFilterableField } from "./order.constant"
import { paginationField } from "../../../constant/paginationField"
import { OrderService } from "./order.service"

const createOrder = catchAsync(
    async(req:Request, res:Response)=>{
        const orderData = req.body

        const result = await OrderService.createOrder(orderData)

        sendResponse<IOrder>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order created successfully!',
            data: result,
          })
    }
)

const getAllOrder = catchAsync(
    async(req:Request, res:Response)=>{
        const filters = pick(req.query, orderFilterableField)
        const paginationOptions = pick(req.query, paginationField)


        const result = await OrderService.getAllOrder(filters, paginationOptions)

        sendResponse<IOrder[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Order retrived successfully!',
            meta: result.meta,
            data: result.data,
          })
    }
)

export const OrderController = {
    createOrder,
    getAllOrder
}