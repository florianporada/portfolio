import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { colors } from '../constants';
import { getHardskills } from '../lib/helper';

import Layout from '../components/layout';
import SectionTitle from '../components/sectiontitle';
import SEO from '../components/seo';
import ListItem from '../components/listitem';
import Tag from '../components/tag';

const Section = styled.section`
  margin: 50px 0;

  &:first-of-type {
    margin-top: 0;
    padding-top: 50px;
  }

  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  max-width: 992px;
  margin: 0 auto;
  font-size: 1.75rem;
  line-height: 1.1;
  padding: 0 15px;

  em {
    font-weight: bold;
  }

  strong {
    background-color: ${colors.TEXT};
    color: ${colors.BACKGROUND};
    transition: background-color 0.25s ease, color 0.25s ease;

    &:hover {
      background-color: ${colors.PRIMARY};
      color: ${colors.TEXT};
    }
  }
`;

const Note = styled.span`
  display: block;
  text-align: center;
  padding: 15px;
`;

const List = styled.ul`
  margin-left: 0;
  margin-top: 30px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const WorkItem = styled.div`
  margin-bottom: 30px;

  a {
    font-family: 'Suprapower';
    font-size: 1.5rem;
    color: ${colors.TEXT};
  }

  p:last-of-type {
    margin-bottom: 15px;
  }

  span:first-of-type {
    font-family: 'Polarity';
    font-size: 0.8rem;
  }
`;

const SimpleVersionPage = ({ data }) => {
  const hardskills = useMemo(() => getHardskills(data.skill), [data]);

  return (
    <Layout simple>
      <SEO title="Simple Version" />
      <Note>
        Hey!
        <span role="img" aria-label="waving hand">
          👋
        </span>
        Seems your browser does not support JavaScript. That is why you are
        seeing a simple version of the portfolio.
      </Note>
      <Section id="about">
        <SectionTitle>About</SectionTitle>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: data.about.html }}></div>
        </Content>
      </Section>
      <Section id="work">
        <SectionTitle>Selected Work</SectionTitle>
        <Content>
          {data.work.nodes.map((item) => (
            <WorkItem key={item.id}>
              <span>{item.frontmatter.date.split('-')[0]}</span>
              <h3>{item.frontmatter.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: item.html }}></div>
              <a
                href={item.frontmatter.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
              {item.frontmatter.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </WorkItem>
          ))}
        </Content>
      </Section>
      <Section id="skill">
        <SectionTitle>{data.skill.frontmatter.title}</SectionTitle>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: data.skill.html }}></div>
        </Content>
        <SectionTitle>Tools I use</SectionTitle>
        <Content>
          <List>
            {hardskills.map((item) => (
              <li key={item || 'things'} style={{ margin: '22.5px 5px' }}>
                <ListItem
                  href={`http://www.google.com/search?q=what+is+${item
                    .split(' ')
                    .join('+')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item}
                </ListItem>
              </li>
            ))}
          </List>
        </Content>
      </Section>
    </Layout>
  );
};

export default SimpleVersionPage;

SimpleVersionPage.propTypes = {
  data: PropTypes.object,
};

SimpleVersionPage.defaultProps = {};

export const query = graphql`
  query {
    about: markdownRemark(fileAbsolutePath: { regex: "/content/about/" }) {
      id
      html
      frontmatter {
        description
        title
        date
      }
    }
    skill: markdownRemark(fileAbsolutePath: { regex: "/content/skill/" }) {
      id
      html
      htmlAst
      frontmatter {
        title
        hardskills
      }
    }
    work: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/work/" }
        frontmatter: { featured: { eq: true } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      nodes {
        id
        frontmatter {
          title
          date
          tags
          link
          description
        }
        html
      }
    }
    pages: allFile(filter: { relativePath: { regex: "/pages/" } }) {
      nodes {
        id
        name
      }
    }
  }
`;
