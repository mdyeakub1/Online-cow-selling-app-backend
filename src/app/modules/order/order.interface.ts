import { Model, Types } from "mongoose"

export type IOrder = {
    cow: string | Types.ObjectId
    buyer: string | Types.ObjectId
}

export type OrderModel = Model<IOrder, Record<string, unknown>>


  export type IOrderFilters = {
      searchTerm?: string;
      cow?: {
         name?: string
     }
  
  }