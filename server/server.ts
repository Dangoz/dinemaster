import App from "./App";
import { AuthenticationService } from "./areas/authentication/services/authen.service";
import AuthenticationController from "./areas/authentication/controllers/authen.controller";
import PostController from "./areas/post/controllers/post.controller";
import UserController from "./areas/user/controllers/user.controller";

// import nextApp from "./config/next.app";

  const server = new App([
    new AuthenticationController(new AuthenticationService()),
    new PostController(),
    new UserController()
  ]);
  
  server.start();