export interface IPostCard {
  id: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  content: {
    image: string | null;
    text: string | null;
  };
  upVotes: number;
  downVotes: number;
  commentsCount: number;
  comments: {
    author: {
      id: string;
      image: string;
      name: string | null;
    };
    comment: string;
    upVotes: number;
    downVotes: number;
    repliesCount: number;
    replies: {
      author: {
        id: string;
        image: string;
        name: string | null;
      };
      reply: string;
    }[];
  }[];
  isComment?: boolean;
  createdAt: string;
}

// Categories for tech posts
export type TPostCategory =
  | "Web"
  | "Software Engineering"
  | "AI"
  | "Gadgets"
  | "Apps";

// Post structure
export interface IPost {
  _id: string;
  author: IAuthor;
  title: string;
  content: string; // Could be HTML or Markdown depending on the editor
  category: TPostCategory;
  tags: string[];
  premium: boolean;
  images?: string[];
  video?: string;
  upvotes: string[];
  downvotes: string[];
  numberOfComments: number;
  numberOfDownvotes: number;
  numberOfUpvotes: number;
  isDeleted: boolean;
  isBlocked: boolean;
  comments?: string[];
  createdAt: string;
}

export interface IAuthor {
  _id: string, name: string, email: string, profilePicture: string, verified: true
}

// Post creation interface
export interface CreatePost {
  author: string;
  title: string;
  content: string;
  category: TPostCategory;
  tags?: string[];
  premium?: boolean;
  images?: string[];
}

// Post update interface
export interface UpdatePost {
  title?: string;
  content?: string;
  category?: TPostCategory;
  tags?: string[];
  premium?: boolean;
  images?: string[];
}

// Upvote/Downvote system
export interface Vote {
  userId: string;
  postId: string;
  type: "upvote" | "downvote";
}

export const TPostKeys: string[] = [
  "author",
  "title",
  "content",
  "category",
  "tags",
  "premium",
  "images",
  "upvotes",
  "downvotes",
  "isDeleted",
  "isBlocked",
  "comments",
];

export const TPostUpdateKeys: string[] = [
  "title",
  "content",
  "category",
  "tags",
  "images",
  "isDeleted",
];
