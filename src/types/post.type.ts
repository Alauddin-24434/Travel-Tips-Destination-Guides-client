import { TUser } from ".";

export interface IPost {
  _id: string;
  title: string;
  content: string;
  description: string;
  author: TUser;
  images: string[];
  category: string;
  upvote: string[];
  downvote: string[];
  isPremium: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  location: string;
  commentCount: number;
}
