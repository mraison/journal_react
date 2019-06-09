import React from 'react';
import { Link } from 'react-router-dom'
import history from '../history';
import queryString from 'query-string'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {search: ''}
    this.handleSearchUpdate = this.handleSearchUpdate.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchUpdate(e) {
    this.setState({search: e.target.value})
  }

  handleSearchSubmit(location) {
    history.push({search: `tags=${this.state.search === '' ? 'None' : this.state.search}`})
    window.location.reload();
  }

  render() {
    // console.log(this.props.location)
    // console.log(history)
    return (
      <div>
        <div>
          <label> Search:
              <input
                className="searchInputfield"
                type="text"
                name="search"
                onChange={this.handleSearchUpdate}
              />
          </label>
          <label>
            <button
              onClick={() => this.handleSearchSubmit(this.props.location)}
            >
              Submit
            </button>
          </label>
        </div>
      </div>
    );
  }
}

export default SearchBar;