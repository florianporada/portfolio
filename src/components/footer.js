import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { colors, breakpoints } from '../constants';
import SectionTitle from './sectiontitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faRegularIcons from '@fortawesome/free-regular-svg-icons';
import * as faSolidIcons from '@fortawesome/free-solid-svg-icons';
import * as faBrandIcons from '@fortawesome/free-brands-svg-icons';

const faComplete = {
  ...faBrandIcons,
  ...faRegularIcons,
  ...faSolidIcons,
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
  width: 992px;
  margin: 0 auto;
`;

const Ul = styled.ul`
  list-style: none;
  margin-left: 0;
`;

const Overlay = styled.div`
  height: 1.1em;
  width: 1.5em;
  background: ${colors.TEXT};
  margin-top: 4px;
  margin-left: -1.1em;
  opacity: 1;
  transition: opacity 0.5s ease 0.1s;
`;

const Li = styled.li`
  display: flex;

  h3 {
    margin-bottom: 0;
  }

  &:hover {
    ${Overlay} {
      opacity: 0;
    }
  }
`;

const Copyright = styled.div`
  display: block;
  align-self: flex-end;
  font-family: 'Suprapower';
  text-decoration: none;

  @media (max-width: ${breakpoints.MD}px) {
    font-size: 1.5rem;
  }
`;

const Footer = ({ simple }) => {
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
      <SectionTitle invert>Contact</SectionTitle>
      <Content>
        <Ul>
          {data.contact.frontmatter.social.map((detail) => {
            return (
              <Li key={detail.name}>
                <h3>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={detail.link}
                  >
                    {detail.name}
                  </a>
                </h3>
                {!simple && (
                  <>
                    <FontAwesomeIcon
                      style={{ marginLeft: 10, marginTop: 5 }}
                      icon={faComplete[detail.faIcon]}
                    />
                    <Overlay />
                  </>
                )}
              </Li>
            );
          })}
        </Ul>
      </Content>
      <Copyright>
        <span>{`© ${new Date().getFullYear()} `}</span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/flooopooo"
        >
          florianporada
        </a>
      </Copyright>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  data: PropTypes.object,
  simple: PropTypes.bool,
};

Footer.defaultProps = {
  simple: false,
};

export default Footer;
