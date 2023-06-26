import { Model, Types } from "mongoose";

export enum CowCategory {
    Dairy = "Dairy",
    Beef = "Beef",
    DualPurpose = "Dual Purpose",
  }
  
  export type ICow = {
    name: string;
    age: string;
    price: number | undefined;
    location: 'Dhaka' | 'Chattogram' | 'Barishal' | 'Rajshahi' | 'Sylhet' | 'Comilla' | 'Rangpur' | 'Mymensingh';
    breed: 'Brahman' | 'Nellore' | 'Sahiwal' | 'Gir' | 'Indigenous' | 'Tharparkar' | 'Kankrej';
    weight: number;
    label: string;
    category: CowCategory;
    seller?: number | Types.ObjectId | null
  };

  export type ICowFilters = {
    searchTerm?: string;
    minPrice?:number,
    maxPrice?:number;
    name?:string;
    location?: string;
    breed:string;
    category?:string;
  
  }
  
  export type CowModel = Model<ICow, Record<string, unknown>>