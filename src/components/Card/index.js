import React from 'react';
import './card.css';

const Card = (props) => {
  return (
    <div className="card">
      <div className="repo-name ml-2">{props.repoName}</div>
      <div className="description ml-2">{props.description}</div>
      <div className="footer">
        <div className="language ml-2">{props.language}</div>
        <div className="stars-count">
          {props.starsCount === 0 ? null : <i className="fas fa-star"> {props.starsCount}</i>}
        </div>
        <div className="is-fork">
          {props.isFork === 0 ? null : <i className="fas fa-code-branch"> {props.isFork}</i>}
        </div>
      </div>
    </div>
  );
};

export default Card;