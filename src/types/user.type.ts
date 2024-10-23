import { TPaymentInfo } from "./payment.type";

export type TUserRole = 'user' | 'admin';

export interface IUser {
  name: string;
  email: string;
  phone?: string;
  password: string;
  profilePicture?: string;
  verified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  role: TUserRole;
  followers?: string[]; // List of follower IDs
  following?: string[]; // List of followed user IDs
  posts?: string[]; // List of user's post IDs
  paymentInfo?: TPaymentInfo;
}

// User profile update
export interface IUpdateProfile {
  name?: string;
  password?: string;
  phone?: string;
  profilePicture?: string;
};