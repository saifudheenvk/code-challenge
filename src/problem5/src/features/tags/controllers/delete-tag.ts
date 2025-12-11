import { tagService } from "@services/db/tags";
import { Request, Response } from "express";
import HTTP_STATUS from 'http-status-codes';




class DeleteTagController {
    public async deleteTag(req: Request, res: Response): Promise<void> {
        const tagId = req.params.tagId as string;
        const tag = await tagService.deleteTag(tagId);
        res.status(HTTP_STATUS.OK).json({ message: 'Tag deleted successfully', tag });
    }
}

export const deleteTagController = new DeleteTagController();