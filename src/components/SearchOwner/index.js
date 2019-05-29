import React, {Component} from 'react';
import Card from '../Card';
import './searchOwner.css';

class SearchOwner extends Component {
  state = {
    userRepos: null
  };

  fetchRepos = async (user) => {
    const clientId = "Iv1.16a7955eb5dd4ecf";
    const clientSecret = "bffd4bbf5630141939182dd3c50b7f7840c7f8d5";

    if (user) {
      const fetchApi = await fetch(`https://api.github.com/users/${user}/repos?client_id=${clientId}&client_secret=${clientSecret}`);
      const data = await fetchApi.json();

      this.setState({
        userRepos: data
      });}
  };

  render() {
    const { userRepos } = this.state;
    const cards = (!userRepos ? null : userRepos.map(card => {
      return (
        <Card key={card.id}
          repoName={card.name}
          description={card.description}
          language={card.language}
          isFork={card.forks}
          starsCount={card.stargazers_count}
        />
      );
    }));

    return (
      <div className="container">
        <div className="header">Find repositories by user name</div>

        <div className="form-inline">
          <input className="col-8 form-control mt-5 mr-2 mb-5" type="text" ref={e => this.textInput = e}/>
          <button className="col-3 btn btn-outline-warning mt-5 mb-5" onClick={() => this.fetchRepos(this.textInput.value)}>Search</button>
        </div>

        <div className="row">
          {cards}
        </div>
      </div>
    );
  }
}

export default SearchOwner;