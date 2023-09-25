export interface Post {
  imageUrl: string;
  user: string;
  likes: number;
  caption: string;
  profile_picture: string;
  likes_by_users: string[];
  comments: {user: string; comment: string}[];
  owner_uid: string;
  id?: string;
}
