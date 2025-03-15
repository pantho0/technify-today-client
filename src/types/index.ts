import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  user: IUser;
  image: string;
  title: string;
  category: string;
  details: string;
  isPremium: boolean | string;
  upVote: string[];
  downVote: string[];
  comments: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage: string;
  following: string[];
  followedBy: string[];
  isPremium: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  fullName: string;
  id: string;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}
