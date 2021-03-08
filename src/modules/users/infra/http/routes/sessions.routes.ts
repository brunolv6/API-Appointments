import { Router } from "express";
import SessionsController from "../controllers/SessionsCotroller";

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.post('/', sessionsController.create);

export default sessionsRoutes;
