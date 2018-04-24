import React from 'react';
import PropTypes from 'prop-types';

export const ExportCSVButton = (props) => {
  const {
    buttonExportCSV,
    onClick,
  } = props;
  const ButtonExportCSV = buttonExportCSV.type;

  return (
    <ButtonExportCSV
      {...buttonExportCSV.props}
      onClick={onClick}
    >
      {buttonExportCSV.props.value}
    </ButtonExportCSV>
  );
};

ExportCSVButton.propTypes = {
  buttonExportCSV: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
};
