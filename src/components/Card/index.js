import React from 'react';
import moment from 'moment';
import './card.css';

const Card = (props) => {
  return (
    <div className="card">
      <div className="repo-name">{props.name}</div>
      <div className="description">{props.description}</div>
      <div className="footer">
        <div className="language">{props.language}</div>
        <div className="stars-count">
          {props.starsCount > 0 && <i className="fas fa-star"> {props.starsCount}</i>}
        </div>
        <div className="is-fork">
          {props.forksCount > 0 && <i className="fas fa-code-branch"> {props.forksCount}</i>}
        </div>
        <div className="updated-at">
          Updated {moment(props.updatedDate).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default Card;