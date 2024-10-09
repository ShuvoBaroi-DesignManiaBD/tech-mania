export interface IPostCard {
  id: string;
  currentUserId: string;
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
