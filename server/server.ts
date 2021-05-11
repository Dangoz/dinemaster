import App from "./App";
import { AuthenticationService } from "./areas/authentication/services/authen.service";
import AuthenticationController from "./areas/authentication/controllers/authen.controller";
import PostController from "./areas/post/controllers/post.controller";

import nextApp from "./config/next.app";

const serve = async () => {
  await nextApp.prepare();

  const server = new App(nextApp, [
    new AuthenticationController(new AuthenticationService()),
    new PostController(),
  ]);
  
  server.start();
}
serve();