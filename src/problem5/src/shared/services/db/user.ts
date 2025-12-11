import { ICreateUser, IUpdateUser, IUserDocument } from "@users/interfaces/user.interface";
import { UserModel } from "@users/models/user";
import { BadRequestError } from "@global/helpers/error-handler";

class UserService {
    public async createUser(user: ICreateUser): Promise<IUserDocument> {
        const existingUser = await this.getUserByEmail(user.email);
        if (existingUser) {
            throw new BadRequestError('User already exists');
        }
        const newUser = await UserModel.create(user);
        return newUser;
    }

    public async getUserByEmail(email: string): Promise<IUserDocument | null> {
        const user = await UserModel.findOne({ email });
        return user;
    }

    public async getUserById(id: string): Promise<IUserDocument | null> {
        const user = await UserModel.findById(id);
        return user;
    }

    public async updateUser(id: string, user: IUpdateUser): Promise<IUserDocument | null> {
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
    }
    
    public async deleteUser(id: string): Promise<IUserDocument | null> {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return deletedUser;
    }

    public async getAllUsers(): Promise<IUserDocument[]> {
        const users = await UserModel.find();
        return users;
    }
}

export const userService = new UserService();