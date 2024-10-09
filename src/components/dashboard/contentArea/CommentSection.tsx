import React from 'react';
import CommentItem from './CommentItem';

const CommentSection = ({comments}) => {
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