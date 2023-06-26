import { Model, Types } from 'mongoose'

export type IUser = {
  role: string
  password: string
  name:{
    firstName: string
    lastName: string
    middleName?: string
  }
  phoneNumber: string
  address: string
  budget?: number
  income?: number
}


export type IUserFilters = {
  searchTerm?: string,
  name?:{
    firstName:string,
    lastName: string
  },
  phoneNumber?: string,
  address?:string

}

export type UserModel = Model<IUser, Record<string, unknown>>