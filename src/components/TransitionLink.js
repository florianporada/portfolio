import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-plugin-transition-link';
import scrollTo from 'gatsby-plugin-smoothscroll';

export default function TransitionLink({ className, children, to }) {
  if (to.startsWith('#')) {
    return (
      <a
        className={className}
        href={to}
        onClick={(e) => {
          e.preventDefault();
          scrollTo(to);
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      activeClassName="active"
      className={className}
      to={to}
      exit={{
        length: 0.5,
      }}
      entry={{ delay: 0.5 }}
    >
      {children}
    </Link>
  );
}

TransitionLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};
