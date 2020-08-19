import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import './TableTitle.css';

const TableTitle = ({ title, button }) => {
  let buttonComponent = '';
  const needToRenderButton = (button && (button.label || button.icon));
  if (needToRenderButton) {
    buttonComponent = React.createElement(Button, {
      ...button,
      icon: button.icon ? React.createElement(button.icon) : '',
    }, button.label);
  }

  return (
    <div>
      <h4 className="table-title-heading">{title}</h4>

      {
        (needToRenderButton) ? <h4 className="table-title-button">{ buttonComponent }</h4> : ''
      }

      <div style={{
        clear: 'both',
      }}
      />
    </div>
  );
};

TableTitle.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.shape({
    icon: PropTypes.elementType,
    type: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
  }),
};

TableTitle.defaultProps = {
  button: null,
};

export default TableTitle;
