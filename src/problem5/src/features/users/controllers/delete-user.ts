import { userService } from "@services/db/user";
import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';




class DeleteUserController {
    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId as string;
        const user = await userService.deleteUser(userId);
        res.status(HTTP_STATUS.OK).json({ message: 'User deleted successfully', user });
    }
}

export const deleteUserController = new DeleteUserController();