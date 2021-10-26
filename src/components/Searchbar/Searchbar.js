import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [imageQuery, setImageQuery] = useState('');

  // запись нормализированного запроса в стейт imageQuery
  const handleImageNameChange = e => {
    setImageQuery(e.currentTarget.value.toLowerCase());
  };

  // передача в App строки imageQuery и сброс стейта
  const handleSubmitButton = e => {
    e.preventDefault();

    if (imageQuery.trim() === '') {
      return toast.warn('Please enter your query!');
    }
    onSubmit(imageQuery);
    setImageQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm}>
        <button
          type="submit"
          className={s.SearchFormButton}
          onClick={handleSubmitButton}
        >
          <span className={s.SearchFormButtonLabel}>
            Search
          </span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="imageName"
          value={imageQuery}
          onChange={handleImageNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
