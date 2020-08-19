import { Breadcrumb, Typography } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const NavigationPath = ({ path }) => (
  <div>
    <Breadcrumb separator=">">
      {
        path.map((item, index) => {
          if (index === path.length - 1) {
            return '';
          }

          const icon = React.createElement(item.icon);
          const title = (<span>{` ${item.title} `}</span>);

          return (
            <Breadcrumb.Item key={item.level}>
              { icon }
              {(item.route) ? (
                <Link to={item.route}>
                  {title}
                </Link>
              ) : title}
            </Breadcrumb.Item>
          );
        })
      }
    </Breadcrumb>

    <Title
      level={4}
      style={{
        marginTop: '0.4rem',
      }}
    >
      {React.createElement(path[path.length - 1].icon)}
      <span>{` ${path[path.length - 1].title} `}</span>
    </Title>

  </div>
);

NavigationPath.propTypes = {
  path: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.React,
      title: PropTypes.string,
      level: PropTypes.number,
      route: PropTypes.string,
    }),
  ).isRequired,
};

export default NavigationPath;
