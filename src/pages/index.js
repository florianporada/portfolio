import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Image from '../components/image';
import Hero from '../components/hero';
import SEO from '../components/seo';

import { colors } from '../constants';

const Title = styled.h1`
  font-size: 140px;
  margin-left: 5px;
  transition: margin 250ms ease-out;
  color: ${colors.TEXT};

  &::after {
    content: '';
    display: block;
    height: 10px;
    width: 0;
    background: ${colors.TEXT};
    position: absolute;
    margin-left: 120px;
    margin-top: -30px;
    z-index: 2;
    transition: width 250ms ease-out;
  }

  &:hover {
    margin-left: 10px;

    &::after {
      width: 70%;
    }
  }

  @media (max-width: 768px) {
    font-size: 100px;
  }

  @media (max-width: 320px) {
    font-size: 80px;

    &::after {
      margin-left: 0;
      margin-top: -20px;
    }

    &:hover {
      margin-left: 10px;

      &::after {
        width: 90%;
      }
    }
  }
`;

const Card = styled.div``;

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        title={data.contentJson.about.name}
        text={data.contentJson.about.short}
        hide
      />
      <section>
        <Title>Selected Work</Title>
        {data.work.nodes.map((item) => {
          return (
            <Card key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.title}</p>
              <p>{item.title}</p>
            </Card>
          );
        })}
      </section>
      <section>
        <Title>Bio</Title>
      </section>
      <section>
        <Title>Skill</Title>
      </section>
    </Layout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.object,
};

IndexPage.defaultProps = {};

export const query = graphql`
  query {
    contentJson(about: { name: { eq: "Florian" } }) {
      id
      about {
        name
        short
      }
    }
    work: allWorkJson {
      nodes {
        date
        description
        excerpt
        id
        link
        title
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
