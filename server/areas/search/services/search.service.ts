import TagModel from "../../../model/tag.model";
import PostModel from "../../../model/post.model";
import ITag from "../../../interfaces/tag.interface";
import IPost from "../../../interfaces/post.interface";
import PostViewModel from "../../../viewmodel/post.viewmodel";
import Sort from "../../util/sort";

export default class SearchService {
  private _tagdb: TagModel = new TagModel();
  private _postdb: PostModel = new PostModel();

  async generateTagPool(): Promise<ITag[]> {
    const tags = await this._tagdb.getTagsByPostCount();
    return tags;
  }

  async parseQuery(queryList: string[], userId: string): Promise<{ tags: ITag[], posts: IPost[] }> {
    let tags: ITag[] = [];
    let posts: IPost[] = [];

    console.log('queryList', queryList);

    // get and sort out tags by relative/frequency to queryList
    for (let query of queryList) {
      tags = [...tags, ...await this._tagdb.getTagsByKeyword(query)]
    }
    tags = await Sort.sortByFrequency(tags);
    console.log('tags', tags);

    // get and sort out posts by relative/frequency to tags
    for (let tag of tags) {
      posts = [...posts, ...await this._postdb.getPostsByTag(tag, userId)];
    }
    posts = await Sort.sortByFrequency(posts);
    console.log('posts1', posts);
    for (let i = 0; i < posts.length; i++) {
      posts[i] = await PostViewModel.build(posts[i]);
    }
    console.log('posts2', posts);

    return { tags, posts };
  }
}