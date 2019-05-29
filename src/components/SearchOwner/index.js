import React, {Component} from 'react';
import Card from '../Card';
import { Button } from 'react-bootstrap';

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
          isFork={card.forks}
          starsCount={card.stargazers_count}
          updatedDate={card.updated_at}
          language={card.language}
        />
      );
    }));

    return (
      <div className="container">
        GitHub API client
        <input className="col-12" type="text" ref={e => this.textInput = e}/>
        <button onClick={() => this.fetchRepos(this.textInput.value)}>Search</button>
        {cards}
      </div>
    );
  }
}

export default SearchOwner;