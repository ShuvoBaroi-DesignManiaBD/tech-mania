import { TPaymentInfo } from "./payment.type";

export type TUserRole = 'user' | 'admin';

export interface IUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  password: string;
  profilePicture?: string;
  verified: boolean;
  postCredit?: number;
  followCredit?: number;
  isDeleted: boolean;
  isBlocked: boolean;
  role: TUserRole;
  followers?: string[]; // List of follower IDs
  following?: string[]; // List of followed user IDs
  posts?: string[]; // List of user's post IDs
  paymentInfo?: TPaymentInfo;
  createdAt?: string;
  updatedAt?: string;
  numberOfPosts?: number;
}

// User profile update
export interface IUpdateProfile {
  name?: string;
  password?: string;
  phone?: string;
  profilePicture?: string;
};

export interface IRegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: TUserRole;
}