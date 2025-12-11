import { Document, Types } from 'mongoose';

export interface IUserDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  age: number;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
    name: string;
    age: number;
    email: string;
    password: string;
}

export interface IUpdateUser {
    name?: string;
    age?: number;
    email?: string;
    password?: string;
}