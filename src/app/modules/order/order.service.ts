import mongoose, { SortOrder } from "mongoose"
import { Cow } from "../cow/cow.model"
import { User } from "../user/user.model"
import { IOrder, IOrderFilters } from "./order.interface"
import { Order } from "./order.model"
import ApiError from "../../../errors/ApiError"
import httpStatus from "http-status"
import { IPaginationOptions } from "../../../interfaces/pagination"
import { paginationHelpers } from "../../../helper/paginationHelper"
import { orderSearchableField } from "./order.constant"
import { IGenericPesponse } from "../../../interfaces/common"

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const { cow, buyer } = payload;

  const isOrderExist = await Order.findOne({ cow: cow });

  if (isOrderExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "This cow has already been sold!");
  }

  const cowData = await Cow.findOne({ _id: cow });
  const cowPrice = Number(cowData?.price);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const sellerIncomeUpdate = await User.findByIdAndUpdate(
      cowData?.seller,
      {
        $inc: { income: cowPrice },
      },
      { session }
    );

    if (!sellerIncomeUpdate) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update seller income");
    }

    const buyerData = await User.findOne({ _id: buyer });
    const buyerBudget = Number(buyerData?.budget);

    if (buyerBudget < cowPrice) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient budget");
    }

    const buyerBudgetUpdate = await User.findByIdAndUpdate(
      buyer,
      {
        $inc: { budget: -cowPrice },
      },
      { session }
    );

    if (!buyerBudgetUpdate) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update buyer budget");
    }

    const cowLevelUpdate = await Cow.findByIdAndUpdate(
      { _id: cow },
      { $set: { label: "Sold out" } }
    );

    if (!cowLevelUpdate) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update cow label");
    }

    const result = await Order.create(payload);
    const populatedResult = await (await result.populate("cow")).populate("buyer");

    await session.commitTransaction();
    return populatedResult;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

  

const getAllOrder = async (filters: IOrderFilters, paginationOptions: IPaginationOptions): Promise<IGenericPesponse<IOrder[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: orderSearchableField.map((field) => ({
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

  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Order.find(whereCondition)
    // .populate('cow')
    // .populate('buyer')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrderService = {
  createOrder,
  getAllOrder
}