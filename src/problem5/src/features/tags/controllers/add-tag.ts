import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { ICreateTag } from '@tags/interfaces/tag.interface';
import { tagService } from '@services/db/tags';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { addTagSchema } from '@tags/schemes/tag';


class AddTagController {
    @JoiValidation(addTagSchema) 
    public async addTag(req: Request, res: Response): Promise<void> {
        const tagBody: ICreateTag = req.body as unknown as ICreateTag;
        const tag = await tagService.createTag(tagBody);
        res.status(HTTP_STATUS.CREATED).json({ message: 'Tag created successfully', tag });
    }
}

export const addTagController = new AddTagController();