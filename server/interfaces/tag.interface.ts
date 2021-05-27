export default interface ITag {
  id: string;
  name: string;
  hit: number;
  posts?: { postId: string }[];
}