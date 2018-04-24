import React from 'react';
import PropTypes from 'prop-types';

export const SearchColumnInput = (props) => {
  const {
    inputColumnSearch,
    onChange,
    value,
  } = props;
  const InputColumnSearch = inputColumnSearch.type;

  return (
    <InputColumnSearch
      {...inputColumnSearch.props}
      type="text"
      onChange={onChange}
      value={value}
    />
  );
};

SearchColumnInput.defaultProps = {
  value: '',
};

SearchColumnInput.propTypes = {
  inputColumnSearch: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
