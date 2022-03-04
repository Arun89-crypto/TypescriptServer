import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import validate from "./middleware/validateResources";
import { createUserSchema } from "./schema/user.schema";

export default function (app:Express) {
    app.get('/healthcheck', (req:Request, res:Response) => {
        res.sendStatus(200);
    })

    // User Routes
    // -----------

    // Register User (POST /api/users)
    app.post("/api/users", validate(createUserSchema), createUserHandler)

    // Login User (POST /api/sessions)

    // Get user's sessions (GET /api/sessions)
    
    // Logout (DELETE /api/sessions)

    
}