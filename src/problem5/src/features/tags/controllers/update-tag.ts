import { tagService } from "@services/db/tags";
import { IUpdateTag } from "@tags/interfaces/tag.interface";
import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';
import { JoiValidation } from '@global/decorators/joi-validation.decorators';
import { updateTagSchema } from '@tags/schemes/tag';




class UpdateTagController {
    @JoiValidation(updateTagSchema) 
    public async updateTag(req: Request, res: Response): Promise<void> {
        const tagId = req.params.tagId as string;
        const tagBody: IUpdateTag = req.body as unknown as IUpdateTag;
        const tag = await tagService.updateTag(tagId, tagBody);
        res.status(HTTP_STATUS.OK).json({ message: 'Tag updated successfully', tag });
    }
}

export const updateTagController = new UpdateTagController();