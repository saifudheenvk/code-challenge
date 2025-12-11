import { tagService } from "@services/db/tags";
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import Logger from "bunyan";
import { config } from "@root/config";


const logger: Logger = config.createLogger('GetTagController');
class GetTagController {
    public async getTag(req: Request, res: Response): Promise<void> {
        const tagId = req.params.tagId as string;
        const tag = await tagService.getTagById(tagId);
        res.status(HTTP_STATUS.OK).json({ message: 'Tag fetched successfully', tag });
    }
    public async getAllTags(req: Request, res: Response): Promise<void> {
        logger.debug('Getting all tags with Key', req.query.searchKey);
        const searchKey = req.query.searchKey ?? '';
        const tags = await tagService.getAllTags(searchKey as string);
        logger.debug('Tags fetched successfully', tags);
        res.status(HTTP_STATUS.OK).json({ message: 'All tags fetched successfully', tags });
    }

    public async getTagsByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.userId as string;
        const tags = await tagService.getTagsByUserId(userId);
        res.status(HTTP_STATUS.OK).json({ message: 'Tags fetched successfully', tags });
    }
}

export const getTagController = new GetTagController();