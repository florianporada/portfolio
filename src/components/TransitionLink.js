import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-plugin-transition-link';

export default function TransitionLink({ className, children, to }) {
  return (
    <Link
      className={className}
      to={to}
      exit={{
        length: 0.5,
        trigger: ({ node, e, exit, entry }) =>
          console.log(node, e, exit, entry),
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
  className: PropTypes.string.isRequired,
};
