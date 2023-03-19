import { useState } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handlerOnChange = ({ target }) => {
    setSearchQuery(target.value);
  };

  const handlerOnSubmit = event => {
    event.preventDefault();

    onSubmit(searchQuery);
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handlerOnSubmit}>
        <SearchFormButton
          type="submit"
          disabled={searchQuery.trim().length === 0}
        >
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchQuery"
          value={searchQuery}
          onChange={handlerOnChange}
        />
      </SearchForm>
    </Searchbar>
  );
};
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
