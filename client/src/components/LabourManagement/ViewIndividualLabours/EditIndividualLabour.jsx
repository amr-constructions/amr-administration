import PropTypes from 'prop-types';
import React from 'react';

const EditIndividualLabour = ({ onSubmit, state, setState }) => (<div />);

EditIndividualLabour.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    editAccountHeadVisible: PropTypes.bool,
    modalSubmit: PropTypes.bool,
    newAccountHeadLoading: PropTypes.bool,
    dataForEdit: PropTypes.shape({
      type: PropTypes.string,
      head_name: PropTypes.string,
      id: PropTypes.string,
    }),
  }).isRequired,
  setState: PropTypes.func.isRequired,
};

export default EditIndividualLabour;
