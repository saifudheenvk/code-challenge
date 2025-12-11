import { Application } from "express";
import { healthRoutes } from "@users/routes/healthRoutes";
import { userRoutes } from "@users/routes/userRoutes";
import { tagRoutes } from "@tags/routes/tagRoutes";



export default (app: Application) => {
    const API_BASE_PATH = '/api/v1';
    app.use('', healthRoutes.health());
    app.use(`${API_BASE_PATH}/users`, userRoutes.routes());
    app.use(`${API_BASE_PATH}/tags`, tagRoutes.routes());
}