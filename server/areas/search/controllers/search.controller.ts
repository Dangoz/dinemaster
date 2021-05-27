import IController from "../../../interfaces/controller.interface";
import IUser from "../../../interfaces/user.interface";
import ITag from "../../../interfaces/tag.interface";
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
    this.router.get(`${this.path}/tag-pool`, ensureAuthenticated, this.defaultTagPool);
    this.router.post(`${this.path}/query`, ensureAuthenticated, this.parseQuery);
  }

  private defaultTagPool = async (req: express.Request, res: express.Response) => {
    const tags: ITag[] = await this.searchService.generateTagPool();
    res.status(200).json({ tags })
  }

  private parseQuery = async (req: express.Request, res: express.Response) => {
    const { queryList } = req.body;
    const result = await this.searchService.parseQuery(queryList, req.user.id);
    const { tags, posts } = result;
    res.status(200).json({ tags, posts });
  }
}

export default SearchController;