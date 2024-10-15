import React from 'react';
import CommentItem from './CommentItem';

const CommentSection = ({comments}:{comments:{author:{ id: string; image: string; name: string | null }, comment:string, upVotes:number, downVotes:number, repliesCount:number, replies:{
  author: { id: string; image: string; name: string | null };
  reply: string;
}[]}[]}) => {
    return (
      <div className='overflow-hidden'>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          author={comment.author}
          comment={comment.comment}
          upVotes={comment.upVotes}
          downVotes={comment.downVotes}
          repliesCount={comment.repliesCount}
          replies={comment.replies}
        />
      ))}
    </div>
    );
};

export default CommentSection;