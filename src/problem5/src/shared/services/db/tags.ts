import { BadRequestError } from "@global/helpers/error-handler";
import { ICreateTag, ITagDocument, IUpdateTag } from "@tags/interfaces/tag.interface";
import { TagModel } from "@tags/models/tag";
import Logger from "bunyan";
import { config } from "@root/config";


const logger: Logger = config.createLogger('TagService');

class TagService {
    public async createTag(tag: ICreateTag): Promise<ITagDocument> {
        const newTag = await TagModel.create(tag);
        return newTag;
    }

    public async getTagById(id: string): Promise<ITagDocument | null> {
        const tag = await TagModel.findById(id);
        return tag;
    }

    public async updateTag(id: string, tag: IUpdateTag): Promise<ITagDocument | null> {
        const existingTag = await this.getTagById(id);
        if(!existingTag) {
            throw new BadRequestError('Tag not found');
        }
        logger.debug('Tag created by', tag.createdBy);
        logger.debug('Existing tag created by', existingTag.createdBy);
        if(tag.createdBy.toString() !== existingTag.createdBy.toString()) {
            throw new BadRequestError('You are not authorized to update this tag');
        }
        const updatedTag = await TagModel.findByIdAndUpdate(id, tag, { new: true, runValidators: true });
        return updatedTag;
    }

    public async deleteTag(id: string): Promise<ITagDocument | null> {
        const deletedTag = await TagModel.findByIdAndDelete(id);
        return deletedTag;
    }

    public async getAllTags(searchKey: string): Promise<ITagDocument[]> {
        const query: any = {};
        if(searchKey) {
            query.$text = {
                $search: searchKey,
            };
        }
        const tags = await TagModel.find(query);
        if(tags.length > 0) {
            return tags;
        }
        return [];
    }

    public async getTagsByUserId(userId: string): Promise<ITagDocument[]> {
        const tags = await TagModel.find({ createdBy: userId });
        if(tags.length > 0) {
            return tags;
        }
        return [];
    }
}

export const tagService = new TagService();