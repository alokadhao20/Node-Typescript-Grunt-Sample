import { UserController } from "../controllers/userController";
import { Router } from "express";
export class UserRouter {
    userRoute: Router;
  private userController = new UserController();
  constructor() {
    this.userRoute = Router();
    this.userRoute
        .route("/register")
        .post(this.userController.register)
  }
}