/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  placeholder?: string;
  label: string;
  name: string;
  isRequired?: boolean;
  disabled?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
}

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  profileImage: string;
  bio: any;
  birthDate: string;
  status: string;
  mobileNumber: string;
  address: any;
  isVerified: boolean;
  followers: any[];
  following: any[];
  bookmarkPosts: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
