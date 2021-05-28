import IPost from "../interfaces/post.interface";
import Post_TagModel from "../model/post_tag.model";

/**
 * process post data for client side application
 * matching view model properties with client interface
 */
export default class PostViewModel implements IPost {
  id: string;
  message: string;
  source: string;
  userId: string;
  createdAt: Date;
  likes: number;
  likedByUser: boolean;
  comments?: number;
  username?: string;
  tags?: string[]; 

  private constructor(post: IPost) {
    this.id = post.id;
    this.message = post.message;
    this.source = post.source;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.likes = post.likes;
    this.likedByUser = post.likedByUser;
    this.tags = post.tags;
  }

  /**
   * 
   * @param post - pass in post for view model mappin
   * @param options - options for mapping optional post attributes
   * 
   */
  static async build(post: IPost, options?: { likedByHost?: boolean, tags?: boolean }): Promise<PostViewModel> {
    let likedByCount = 1;
    if (options) {
      if (options.likedByHost) likedByCount = 2;
      if (options.tags) post = await PostViewModel.mapTags(post);
    }

    post = await PostViewModel.mapLikedByUser(post, likedByCount);
    return new PostViewModel(post);
  }

  private static async mapLikedByUser(post: IPost, likedByCount: number): Promise<IPost> {
    post.likedByUser = post.likesList.length == likedByCount;
    return post;
  }

  private static async mapTags(post: IPost): Promise<IPost> {
    const result = await new Post_TagModel().getTagsByPostId(post.id);
    const tags = result.map(tag => tag.Tag.name);
    post.tags = tags;
    return post;
  }
}