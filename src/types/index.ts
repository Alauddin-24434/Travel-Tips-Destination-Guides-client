/* eslint-disable @typescript-eslint/no-explicit-any */
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
}

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};
export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
}



export type TResponse<T> = {
  data: {
    accessToken: any;
    data: any;
    result?: T;
    success: boolean;
    message: string;
  };
  error?: TError;
};

export interface IComment {
  _id: string;
  postId: string;
  userId: IAuthor;
  commentText: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface IAuthor {
  post: string;
  socialMediaLinks: ISocialMediaLinks;
  _id: string;
  email: string;
  username: string;
  profilePicture?: string;
  role: string;
  bio: string;
  gardeningExperienceLevel: [];
  followers: string[];
  following: string[];
  favourite: IPost[];
  isVerified: boolean;
  verificationBadge?: string | null;
  gender: string;
  interests: string;
  location: string;
  status: "Active" | "Blocked";
  phone: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  _id: string;
  title: string;
  bio: string;
  content: string;
  author: IAuthor;
  comments: IComment[];
  tags: string[];
  category: string;
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  isPremium: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface editUserData {
  _id: string | undefined;
  username: string;
  bio: string;
  gardeningExperienceLevel: string;
  location: string;
  phone: string;
  dateOfBirth: Date | undefined | string | null;
  gender: string;
  facebook?: string;
  twitter?: string;
  interest: string;
  instagram?: string;
  linkedin?: string;
  profilePicture?: string;
}