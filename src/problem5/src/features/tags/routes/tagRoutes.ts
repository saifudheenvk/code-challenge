import express, { Router } from 'express';
import { updateTagController } from '@tags/controllers/update-tag';
import { getTagController } from '@tags/controllers/get-tag';
import { deleteTagController } from '@tags/controllers/delete-tag';
import { addTagController } from '@tags/controllers/add-tag';


class TagRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/add', addTagController.addTag);
        this.router.get('/get/:tagId', getTagController.getTag);
        this.router.put('/update/:tagId', updateTagController.updateTag);
        this.router.delete('/delete/:tagId', deleteTagController.deleteTag);
        this.router.get('/getAll', getTagController.getAllTags);
        return this.router;
    }
}

export const tagRoutes = new TagRoutes();