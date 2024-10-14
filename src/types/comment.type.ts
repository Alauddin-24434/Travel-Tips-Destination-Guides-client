import { TUser } from ".";

export type TComment = {
  _id: string;
  post: string;
  commenter: TUser;
  comment: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
