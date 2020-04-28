import { Link, graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faRegularIcons from '@fortawesome/pro-regular-svg-icons';
import * as faBrandIcons from '@fortawesome/free-brands-svg-icons';

const faComplete = {
  ...faBrandIcons,
  ...faRegularIcons,
};

const FooterWrapper = styled.footer`
  min-height: 400px;
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 30px;
  padding: 50px 15px 15px 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
}
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      contact: markdownRemark(
        fileAbsolutePath: { regex: "/content/contact/" }
      ) {
        id
        frontmatter {
          social {
            faIcon
            link
            name
          }
        }
      }
    }
  `);

  return (
    <FooterWrapper>
      <Content>
        <Ul>
          {data.contact.frontmatter.social.map((detail) => {
            return (
              <Li key={detail.name}>
                <FontAwesomeIcon
                  style={{ marginRight: 10 }}
                  icon={faComplete[detail.faIcon]}
                />
                <h3>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={detail.link}
                  >
                    {detail.name}
                  </a>
                </h3>
              </Li>
            );
          })}
        </Ul>
      </Content>
      <div
        style={{
          alignSelf: 'flex-end',
          fontFamily: 'Suprapower',
          textDecoration: 'none',
        }}
      >
        {`© ${new Date().getFullYear()} `}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/flooopooo"
        >
          florianporada
        </a>
      </div>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  data: PropTypes.object,
};

Footer.defaultProps = {};

export default Footer;
