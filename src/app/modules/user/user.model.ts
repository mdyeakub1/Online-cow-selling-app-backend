import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      required: true,
      enum: ['seller', 'buyer']
    },
    password: {
      type: String,
      required: true,
    },
    name:{
        type:{
            firstName:{
                type: String,
                required: true
            },
            lastName:{
                type: String,
                required:true
            },
            middleName:{
                type: String,
                required: false
            }
        }
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    budget: {
        type: Number,
    },
    income: {
        type: Number
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const User = model<IUser, UserModel>('User', userSchema)