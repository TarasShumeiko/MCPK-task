import React from 'react';

const Card = (props) => {
  return (
    <div>
      <div className="repo-name">{props.repoName}</div>
      <div className="description">{props.description}</div>
      <div className="is-fork">{props.isFork}</div>
      <div className="stars-count">{props.starsCount}</div>
      <div className="updated-date">{props.updatedDate}</div>
      <div className="language">{props.language}</div>
    </div>
  );
};

export default Card;