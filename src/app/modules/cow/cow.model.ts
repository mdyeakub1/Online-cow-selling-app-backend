import { Schema, Types, model } from 'mongoose'
import { CowCategory, CowModel, ICow } from './cow.interface'
import { CowBreeds, CowLocations } from './cow.constant'

const CowSchema = new Schema<ICow>(
{
    name: { 
        type: String, 
        required: true 
    },
  age: { 
    type: String, 
    required: true 
},
  price: { 
    type: Number, 
    required: true 
},
  location: { 
    type: String, 
    enum:CowLocations, 
    required: true 
},
  breed: { 
    type: String, 
    enum: CowBreeds, 
    required: true 
},
  weight: { 
    type: Number, 
    required: true 
},
  label: { 
    type: String, 
    required: true 
},
  category: { 
    type: String, 
    enum: Object.values(CowCategory), 
    required: true 
},
  seller: { 
    type: Types.ObjectId,
    ref: 'User'
},
},
{
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
}
)

export const Cow = model<ICow, CowModel>('Cow', CowSchema)