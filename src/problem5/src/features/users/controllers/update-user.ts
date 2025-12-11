import { userService } from "@services/db/user";
import { userCache } from "@services/redis/user.cache";
import { IUpdateUser } from "@users/interfaces/user.interface";
import { updateUserSchema } from '@users/schemes/user';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';




class UpdateUserController {
    @JoiValidation(updateUserSchema) 
    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId as string;
        const userBody: IUpdateUser = req.body as unknown as IUpdateUser;
        const user = await userService.updateUser(userId, userBody);
        if(user) {
            await userCache.setUser(userId, user);
        }
        res.status(HTTP_STATUS.OK).json({ message: 'User updated successfully', user });
    }
}

export const updateUserController = new UpdateUserController();