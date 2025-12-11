import { userService } from "@services/db/user";
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { userCache } from "@services/redis/user.cache";
import { IUserDocument } from "@users/interfaces/user.interface";
import { config } from "@root/config";
import Logger from "bunyan";


const logger: Logger = config.createLogger('getUserController');

class GetUserController {
    public async getUser(req: Request, res: Response): Promise<void> {
        logger.info('Getting user from cache');
        const userId = req.params.userId as string;
        const userFromCache: IUserDocument | null = await userCache.getUser(userId);
        logger.info('User from cache', userFromCache);
        let user: IUserDocument | null = null;
        if(!userFromCache) {
            user = await userService.getUserById(userId);
            logger.info('User from database', user);
            if(user) {
                await userCache.setUser(userId, user);
            }
        } else {
            user = userFromCache;
        }
        res.status(HTTP_STATUS.OK).json({ message: 'User fetched successfully', user });
    }
    public async getAllUsers(req: Request, res: Response): Promise<void> {
        const users = await userService.getAllUsers();
        res.status(HTTP_STATUS.OK).json({ message: 'All users fetched successfully', users });
    }
}

export const getUserController = new GetUserController();