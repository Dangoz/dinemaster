import IPost from "../interfaces/post.interface";

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

  private constructor(post: IPost) {
    this.id = post.id;
    this.message = post.message;
    this.source = post.source;
    this.userId = post.userId;
    this.createdAt = post.createdAt;
    this.likes = post.likes;
    this.likedByUser = post.likedByUser;
  }

  /**
   * 
   * @param post - pass in post for view model mappin
   * @param options - options for mapping optional post attributes
   * 
   */
  static async build(post: IPost, options?: { likedByHost?: boolean }): Promise<PostViewModel> {
    let likedByCount = 1;
    if (options) {
      if (options.likedByHost) likedByCount = 2;
    }

    post = await PostViewModel.mapLikedByUser(post, likedByCount);
    return new PostViewModel(post);
  }

  private static async mapLikedByUser(post: IPost, likedByCount: number): Promise<IPost> {
    post.likedByUser = post.likesList.length == likedByCount;
    return post;
  }
}