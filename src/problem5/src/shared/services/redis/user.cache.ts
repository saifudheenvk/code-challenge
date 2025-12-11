import { ServerError } from "@global/helpers/error-handler";
import { Helper } from "@global/helpers/helper";
import { BaseCache } from "@services/redis/base.cache";
import { IUserDocument } from "@users/interfaces/user.interface";
import { config } from "@root/config";




class UserCache extends BaseCache {
    constructor() {
        super('userCache');
    }

    public async getUser(id: string): Promise<IUserDocument | null> {
        try {
            if(!this.client.isOpen) {
                await this.client.connect();
            }
            const user = await this.client.HGETALL(`user:${id}`) as unknown as IUserDocument;
            // HGETALL returns empty object {} when key doesn't exist
            if(!user || Object.keys(user).length === 0 || !user._id) {
                return null;
            }
            // Refresh TTL on cache hit (extend expiration time)
            await this.client.EXPIRE(`user:${id}`, config.REDIS_TTL as number);
            user.createdAt = Helper.parseJson(`${user.createdAt}`);
            user.updatedAt = Helper.parseJson(`${user.updatedAt}`);
            user.age = Helper.parseJson(`${user.age}`);
            delete user.password;
            return user;
        } catch (error) {
            this.logger.error(error);
            throw new ServerError('Error getting user from cache');
        }
    }

    public async setUser(id: string, user: IUserDocument): Promise<void> {
        const { _id, name, age, email, password, createdAt, updatedAt } = user;
        const dataToSave = {
            "_id": `${_id}`,
            "name": `${name}`,
            "age": `${age}`,
            "email": `${email}`,
            "password": `${password}`,
            "createdAt": `${createdAt}`,
            "updatedAt": `${updatedAt}`,
        }
        try {
            if(!this.client.isOpen) {
                await this.client.connect();
            }
            for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
                await this.client.HSET(`user:${_id}`, itemKey, itemValue);
            }
            // Set TTL (Time To Live) for the cache key - 2 hours
            await this.client.EXPIRE(`user:${_id}`, config.REDIS_TTL as number);
        } catch (error) {
            this.logger.error(error);
            throw new ServerError('Error setting user in cache');
        }
    }
}

export const userCache = new UserCache();