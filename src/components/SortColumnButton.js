import React from 'react';
import PropTypes from 'prop-types';
import * as Icon from 'react-icons/lib/fa';

export const SortColumnButton = (props) => {
  const {
    column,
    onClick,
    onKeyDown,
    sort,
  } = props;

  const activeAsc = sort[column.accessor].asc && sort.active === column.accessor;
  const activeDesc = !sort[column.accessor].asc && sort.active === column.accessor;
  let arrow = '';

  if (activeAsc) {
    arrow = <Icon.FaCaretUp size={20} />;
  } else if (activeDesc) {
    arrow = <Icon.FaCaretDown size={20} />;
  } else {
    arrow = <span><Icon.FaCaretUp size={15} /><Icon.FaCaretDown size={15} /></span>;
  }

  return (
    <span
      role="button"
      tabIndex="0"
      style={{
        cursor: 'pointer',
        margin: '1rem',
        fontSize: activeAsc || activeDesc ? '0.7rem' : '0.5rem',
        color: activeAsc || activeDesc ? 'black' : 'grey',
      }}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {arrow}
    </span>
  );
};

SortColumnButton.propTypes = {
  sort: PropTypes.shape({}).isRequired,
  column: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};
