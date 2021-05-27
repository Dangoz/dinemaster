import api from "../config/axios";
import IPost from "../interface/post.interface";
import ITag from "../interface/tag.interface";

export default class Search {

  static async searchQuery(queryList: string[]):
    Promise<{ tags: ITag[], posts: IPost[] }> {
      const response = await api.post('/search/query', { queryList });
      return response.data;
  }

  static async defaultTagPool(): Promise<ITag[]> {
    const response = await api.get('/search/tag-pool');
    return response.data.tags;
  }

  static async search(query: string[]): Promise<void> {
    return;
  }
}

