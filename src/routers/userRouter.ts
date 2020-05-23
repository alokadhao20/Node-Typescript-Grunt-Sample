import { UserController } from "../controllers/userController";
import { Router } from "express";
export class UserRouter {
    userRoute: Router;
  private userController = new UserController();
  constructor() {
    this.userRoute = Router();
    this.userRoute
        .route("/register")
        /**
         * @swagger
         *
         * paths:
         *   /api/v1/user/register:
         *     post:
         *       tags:
         *         - User Group
         *       summary:  Register a user
         *       description: Register a user
         *       requestBody:
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 userName:
         *                   type: string
         *                 userEmail:
         *                   type: string
         *             example:
         *               userName: Alok Adhao
         *               userEmail: alokadhao@gmail.com
         *       responses:
         *         200:
         *           description: Request Handled sucessfully
         *         500:
         *           description: Internal server error
         */
        .post(this.userController.register)
  }
}