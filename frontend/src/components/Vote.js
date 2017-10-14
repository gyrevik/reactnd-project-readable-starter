import React from 'react';

export default function Vote({ voteFunc, id }) {
  return (
    <span>
      <a href="javascript:void(0)" onClick={() => voteFunc(id, 'upVote')}>upVote</a>
      {' - '}
      <a href="javascript:void(0)" onClick={() => voteFunc(id, 'downVote')}>downVote</a>
    </span>
  )
}