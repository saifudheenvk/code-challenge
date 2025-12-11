import { Document, Types } from 'mongoose';


export interface ITagDocument extends Document {
    _id: Types.ObjectId;
    name: string;
    type: TagType;
    description: string;
    createdBy: Types.ObjectId | string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ICreateTag {
    name: string;
    description: string;
    type: TagType;
    createdBy: Types.ObjectId | string;
  }

  export interface IUpdateTag {
    name?: string;
    description?: string;
    type?: TagType;
    createdBy: Types.ObjectId | string;
  }

  export type TagType = 'user' | 'post' | 'comment';