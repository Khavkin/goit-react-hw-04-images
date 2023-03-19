import { Component } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };

  handlerOnChange = ({ target }) => {
    this.setState({ searchQuery: target.value });
  };

  handlerOnSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const { searchQuery } = this.state;

    this.setState({ searchQuery: '' });
    form.reset();
    // console.dir(this.state);
    this.props.onSubmit(searchQuery);
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handlerOnSubmit}>
          <SearchFormButton
            type="submit"
            disabled={this.state.searchQuery.trim().length === 0}
          >
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handlerOnChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

export default SearchBar;
