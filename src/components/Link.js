import React from 'react';
import PropTypes from 'prop-types';
import TransitionLink from 'gatsby-plugin-transition-link';
import scrollTo from 'gatsby-plugin-smoothscroll';

export default function Link({ className, children, to, target }) {
  const internal = /^\/(?!\/)/.test(to);

  if (!to.startsWith('#') && internal) {
    return (
      <TransitionLink
        activeClassName="active"
        className={className}
        to={to}
        exit={{
          length: 0.5,
        }}
        entry={{ delay: 0.5 }}
      >
        {children}
      </TransitionLink>
    );
  }

  return (
    <a
      target={target}
      rel="noopener noreferrer"
      className={className}
      href={to}
      onClick={(e) => {
        if (to.startsWith('#')) {
          e.preventDefault();
          scrollTo(to);
        }
      }}
    >
      {children}
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  target: PropTypes.string,
};
