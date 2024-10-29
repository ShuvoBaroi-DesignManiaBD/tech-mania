import { IAuthor } from "./post.type";

export interface IComment {
    _id: string;
    postId: string;
    author: string;
    parentCommentId?: string;
    content: string;
    upvotes: string[];
    downvotes: string[];
    isDeleted?: boolean;
    isBlocked?: boolean;
    replies?: string[]; // Nested replies
  }
  
  export interface IReply {
    _id: string;
    postId: string;
    author: string;
    parentCommentId: string;
    content: string;
    upvotes: string[];
    downvotes: string[];
    isDeleted?: boolean;
    isBlocked?: boolean;
    replies?: string[]; // Nested replies
  }
  
  // Comment creation
  // export interface CreateComment {
  //   postId: string;
  //   content: string;
  // }
  
  // Comment update
  export interface IUpdateComment {
    content: string;
    upvotes: string[];
    downvotes: string[];
    isBlocked?: boolean;
    isDeleted?: boolean;
    replies?: string[];
  }

  export type TComment = {
    _id?: string;
    postId: string;
    author: IAuthor;
    content: string;
    upvotes: number | string[];
    downvotes: number;
    upvoteCount: number;
    downvoteCount: number;
    repliesCount: number;
    replies: {
      author: { id: string; image: string; name: string | null };
      content: string;
    }[];
  };

