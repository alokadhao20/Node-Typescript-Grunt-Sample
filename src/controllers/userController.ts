import {Request, Response} from "express"


export class UserController {
  register = async (req: Request, res: Response) => {
    try {
        const registered = await res.locals.mongo.register();
        if(registered.insertedCount === 1) {
            res.status(200).json({
                message: "user registered"
            });
        } else {
            res.status(503).json({
                message: "user not regitered",
                error: "error during database insertion"
            });
        }
      } catch (error) {
        console.log("error, register - ", error);
        res.status(200).json({
            message: "Success",
            error
        });
    }
  }
}