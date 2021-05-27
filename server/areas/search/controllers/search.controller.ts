import IController from "../../../interfaces/controller.interface";
import IUser from "../../../interfaces/user.interface";
import express from "express";
import { ensureAuthenticated } from "../../../middlewares/authen.middleware";
import SearchService from "../services/search.service";


class SearchController implements IController {
  public path = '/search';
  public router = express.Router();
  private searchService: SearchService = new SearchService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    
  }

}

export default SearchController;