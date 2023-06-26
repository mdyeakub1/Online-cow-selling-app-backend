import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"

const createUser = async(payload:IUser):Promise<IUser | null>=>{
    const {budget, income, role} = payload

    if(income && role==='buyer' ){
        throw new ApiError(httpStatus.BAD_REQUEST,"Buyer dosen't have any income")
    } else if(budget && role==='seller'){
        throw new ApiError(httpStatus.BAD_REQUEST,"seller dosen't have any budget")
    }

    const result = await User.create(payload)
    return result
}

export const AuthService = {
    createUser
}