import express from "express";
// import { NextServer } from "next/dist/server/next";
// import errorMiddleware from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";

class App {
  private _app: express.Application;
  private readonly _port: number | string = process.env.PORT || 3000;

  constructor(private nextApp: NextServer, controllers: Controller[]) {
    this._app = express();


    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  public start() {
    this._app.listen(this._port, () => {
      console.log(`App listening on the port ${this._port}`);
    });
  }

  private initializeMiddlewares() {
    require("./middlewares/express.middleware")(this._app, this.nextApp);
    require("./middlewares/passport.middleware")(this._app);
  }

  private initializeControllers(controllers: Controller[]) {
    this._app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (req.headers['X-Forwarded-Proto'] != 'https') {
        res.redirect(`https://${req.headers.host}${req.url}`);
      } else {
        next();
      }
    });

    controllers.forEach((controller) => {
      this._app.use("/", controller.router);
    });

    const handle = this.nextApp.getRequestHandler();
    this._app.all('*', (req: express.Request, res: express.Response) => {
      return handle(req, res)
    });
  }
}

export default App;
