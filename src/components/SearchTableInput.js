import React from 'react';
import PropTypes from 'prop-types';

export const SearchTableInput = (props) => {
  const {
    inputTableSearch,
    value,
    onChange,
  } = props;
  const InputTableSearch = inputTableSearch.type;

  return (
    <InputTableSearch
      {...inputTableSearch.props}
      type="text"
      onChange={onChange}
      value={value}
    />
  );
};

SearchTableInput.defaultProps = {
  value: '',
};

SearchTableInput.propTypes = {
  inputTableSearch: PropTypes.shape({}).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
