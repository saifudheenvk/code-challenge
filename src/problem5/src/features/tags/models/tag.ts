import { ITagDocument } from "@tags/interfaces/tag.interface";
import { model, Model, Schema, Types } from "mongoose";

const tagSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

tagSchema.index({
    name: "text",
    description: "text",
    type: "text",
}, {
    weights: {
        name: 5,
        description: 3,
        type: 1,
    },
    name: "textIndex",
});

const TagModel: Model<ITagDocument> = model<ITagDocument>('Tag', tagSchema, 'Tag');
export { TagModel };