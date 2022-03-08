import { Express, Request, Response } from "express";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validate from "./middleware/validateResources";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schema/product.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { createProduct } from "./service/product.service";

export default function (app:Express) {
    app.get('/healthcheck', (req:Request, res:Response) => {
        res.sendStatus(200);
    })

    // User Routes
    // -----------

    // Register User (POST /api/users)
    app.post("/api/users", validate(createUserSchema), createUserHandler)

    // Login User (POST /api/sessions)
    app.post("/api/sessions",validate(createSessionSchema),createUserSessionHandler)

    // Get user's sessions (GET /api/sessions)
    app.get("/api/sessions",requireUser,getUserSessionsHandler);
    
    // Logout (DELETE /api/sessions)
    app.delete("/api/sessions",requireUser, deleteSessionHandler);
    

    // Product Routes
    //---------------

    // Create Product
    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);

    // Update Product
    app.put('/api/products', [requireUser, validate(updateProductSchema)], updateProductHandler);

    // Get Product
    app.get('/api/products', [requireUser, validate(getProductSchema)],getProductHandler);

    // Delete Product
    app.delete('/api/products', [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}