import { IUserDocument } from '@users/interfaces/user.interface';
import { model, Model, Schema } from 'mongoose';
import { hash } from 'bcryptjs';

const SALT_ROUND = 10;

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { 
  timestamps: true, 
  toJSON: {
    transform(_doc, ret) {
        delete (ret as any).password;
        return ret;
    }
} });

userSchema.pre('save', async function (this: IUserDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
    this.password = hashedPassword;
    next();
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'User');
export { UserModel };