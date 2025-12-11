import express, { Router } from 'express';
import { addUserController } from '@users/controllers/add-user';
import { getUserController } from '@users/controllers/get-user';
import { updateUserController } from '@users/controllers/update-user';
import { deleteUserController } from '@users/controllers/delete-user';


class UserRoutes {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.post('/add', addUserController.addUser);
        this.router.get('/get/:userId', getUserController.getUser);
        this.router.put('/update/:userId', updateUserController.updateUser);
        this.router.delete('/delete/:userId', deleteUserController.deleteUser);
        this.router.get('/getAll', getUserController.getAllUsers);
        return this.router;
    }
}

export const userRoutes = new UserRoutes();