import { SortOrder } from "mongoose"
import { IPaginationOptions } from "../../../interfaces/pagination"
import { paginationHelpers } from "../../../helper/paginationHelper"
import { userSearchableField } from "./user.constant"
import { IUser, IUserFilters } from "./user.interface"
import { User } from "./user.model"
import { IGenericPesponse } from "../../../interfaces/common"

const getAllUser = async(filters:IUserFilters, paginationOptions:IPaginationOptions):Promise<IGenericPesponse<IUser[]>>=>{

    const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: userSearchableField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await User.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await User.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUser = async(id: string):Promise<IUser | null>=>{
  const result = await User.findOne({_id: id})
  return result
}


const updateUser = async(id:string, payload:Partial<IUser>):Promise<IUser | null>=>{

  const result = await User.findOneAndUpdate({_id:id}, payload, {new: true})
  return result
}

const deleteUser = async(id:string):Promise<IUser | null>=>{

  const result = await User.findByIdAndDelete({_id:id})
  return result
}

export const UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}