import App from "./App";
import { AuthenticationService } from "./areas/authentication/services/authen.service";
import AuthenticationController from "./areas/authentication/controllers/authen.controller";

import nextApp from "./config/next.app";

const serve = async () => {
  await nextApp.prepare();

  const server = new App(nextApp, [
    new AuthenticationController(new AuthenticationService()),
  ]);
  
  server.start();
}
serve();