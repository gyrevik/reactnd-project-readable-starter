import React from 'react';

export default function VoteComment({ id }) {
  return (
    <span>
      <a href="javascript:void(0)" onClick={() => voteComment(id, 'upVote')}>upVote</a>
      {' - '}
      <a href="javascript:void(0)" onClick={() => voteComment(id, 'downVote')}>downVote</a>
    </span>
  )
}