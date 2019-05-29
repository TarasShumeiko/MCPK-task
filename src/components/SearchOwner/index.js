import React, {Component} from 'react';
import Card from '../Card';
import Select from 'react-select';
import './searchOwner.css';

class RepositorySearch extends Component {
  sortOptions = [
    { value: 'full_name', label: 'Full name' },
    { value: 'created', label: 'Created' },
    { value: 'updated', label: 'Updated' },
  ];

  orderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  state = {
    user: '',
    page: 1,
    repos: [],
    sort: this.sortOptions[0].value,
    order: this.orderOptions[0].value
  };

  fetchRepos = async (shouldConcatenate) => {
    const { user, page, repos, order, sort } = this.state;
    const result = await fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=10&direction=${order}&sort=${sort}`);
    const data = await result.json();
    this.setState({
      repos: shouldConcatenate ? [...repos, ...data] : data
    })
  };

  handleInputChange = (e) => {
    this.setState({
      user: e.target.value
    })
  };

  handleSearch = () => {
    this.setState({
      page: 1
    }, this.fetchRepos);
  };

  handleLoadMore = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1
    }, () => {
      this.fetchRepos(true);
    });
  };

  handleSortChange = (option) => {
    const { sort } = this.state;
    if (option.value !== sort) {
      this.setState({
        sort: option.value,
        page: 1
      }, this.fetchRepos)
    }
  };

  handleOrderChange = (option) => {
    const { order } = this.state;
    if (option.value !== order) {
      this.setState({
        order: option.value,
        page: 1
      }, this.fetchRepos)
    }
  };

  render() {
    const { user, repos, sort, order } = this.state;
    const hasRepos = repos.length > 0;
    const cards = hasRepos && repos.map(repo => {
      return (
        <Card
          key={repo.id}
          name={repo.name}
          description={repo.description}
          language={repo.language}
          forksCount={repo.forks_count}
          starsCount={repo.stargazers_count}
          updatedDate={repo.updated_at}
        />
      );
    });

    return (
      <div className="container">
        <div className="header">Find repositories by user name</div>

        <div className="form-inline">
          <input
            className="col-8 form-control mt-5 mr-2 mb-5"
            type="text"
            onChange={this.handleInputChange}
          />
          <button
            className="col-3 btn btn-outline-warning mt-5 mb-5"
            disabled={!user}
            onClick={this.handleSearch}
          >
            Search
          </button>
        </div>

        {hasRepos && (
          <div className="row toolbar">
            <span>Sort by</span>
            <Select
              className="col-3"
              options={this.sortOptions}
              defaultValue={this.sortOptions.find(option => option.value === sort)}
              onChange={this.handleSortChange}
            />
            <span>Order</span>
            <Select
              className="col-3"
              options={this.orderOptions}
              defaultValue={this.orderOptions.find(option => option.value === order)}
              onChange={this.handleOrderChange}
            />
          </div>
        )}

        <div className="row cards">
          {cards}
        </div>

        {hasRepos && (
          <button
            className="btn btn-secondary mb-5"
            onClick={this.handleLoadMore}
          >
            Load More
          </button>
        )}
      </div>
    );
  }
}

export default RepositorySearch;