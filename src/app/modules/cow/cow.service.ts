import { SortOrder } from "mongoose"
import { IPaginationOptions } from "../../../interfaces/pagination"
import { paginationHelpers } from "../../../helper/paginationHelper"
import { IGenericPesponse } from "../../../interfaces/common"
import { cowSearchableField } from "./cow.constant"
import { ICow, ICowFilters } from "./cow.interface"
import { Cow } from "./cow.model"

const createCow=async(payload:ICow):Promise<ICow | null>=>{
    const result = await Cow.create(payload)
    return result
}

const getAllCow = async (
  filters: Partial<ICowFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericPesponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  if (minPrice || maxPrice) {
    const priceCondition: { [key: string]: number } = {};

    if (minPrice) {
      priceCondition['$gte'] = minPrice;
    }

    if (maxPrice) {
      priceCondition['$lte'] = maxPrice;
    }

    andConditions.push({
      price: priceCondition,
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereCondition)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async(id: string):Promise<ICow | null>=>{
  const result = await Cow.findOne({_id: id}).populate('seller')
  return result
}


const updateCow = async(id:string, payload:Partial<ICow>):Promise<ICow | null>=>{

  const result = await Cow.findOneAndUpdate({_id:id}, payload, {new: true})
  return result
}

const deleteCow = async(id:string):Promise<ICow | null>=>{

  const result = await Cow.findByIdAndDelete({_id:id})
  return result
}

export const CowService = {
    createCow,
    getAllCow,
    getSingleCow,
    updateCow,
    deleteCow
}