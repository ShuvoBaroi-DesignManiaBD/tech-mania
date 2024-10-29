
export type TVoteType = 'upvote' | 'downvote';
export interface TVote extends Document {
  userId: string;
  parentId: string;
  isDeleted?: boolean;
  type: TVoteType;
  parentType: string;
}
