import express from "express";
import AuthenticationController from "./areas/authentication/controllers/authen.controller";
import { AuthenticationService } from "./areas/authentication/services/authen.service";

import next from "next"
// import nextApp from "./config/next.app";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// const app = nextApp;

const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();

    // require("./middlewares/express.middleware")(server, app);
    server.use(express.urlencoded({ extended: true }));

    const handle = app.getRequestHandler();
    server.all('*', (req: express.Request, res: express.Response) => {
      return handle(req, res)
    });

    server.get('/hey', (req: express.Request, res: express.Response) => {
      console.log('hey');
      return app.render(req, res, '/hello', {});
    })

    server.get('/b', (req: express.Request, res: express.Response) => {
      return app.render(req, res, '/b', { id: 'uuid666666' })
    })
    // server.use('/', new AuthenticationController(new AuthenticationService()).router);

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    })

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();