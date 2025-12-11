import HTTP_STATUS from 'http-status-codes';
import { userService } from "@services/db/user";
import { ICreateUser } from "@users/interfaces/user.interface";
import { Request, Response } from 'express';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { createUserSchema } from '@users/schemes/user';




class AddUserController {
    @JoiValidation(createUserSchema) 
    public async addUser(req: Request, res: Response): Promise<void> {
        const userBody: ICreateUser = req.body as unknown as ICreateUser;
        const user = await userService.createUser(userBody);
        res.status(HTTP_STATUS.CREATED).json({ message: 'User created successfully', user });
    }
}

export const addUserController = new AddUserController();