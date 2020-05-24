import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes, { arrayOf, string } from 'prop-types';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { useSpring, animated, useSprings } from 'react-spring';

import { getHardskills } from '../../lib/helper';
import { colors } from '../../constants';
import ListItem from '../listitem';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px 15px 15px;
  line-height: 1.1;
  max-width: 992px;
  margin: 0 auto;
`;

const Content = styled(animated.div)`
  font-size: 1.75rem;
  line-height: 1.25em;
  margin-top: 30px;

  em {
    font-weight: bold;
  }

  strong {
    padding: 2px;
    background-color: ${colors.TEXT};
    color: ${colors.BACKGROUND};
    transition: background-color 0.25s ease, color 0.25s ease;

    &:hover {
      background-color: ${colors.PRIMARY};
      color: ${colors.TEXT};
    }
  }
`;

const List = styled(animated.ul)`
  margin-left: 0;
  margin-top: 30px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  opacity: 0;
`;

const ImageWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transition: all 0.25s ease;
`;

const Button = styled.a`
  background-color: ${colors.TEXT};
  color: ${colors.BACKGROUND};
  font-size: 2.75em;
  padding: 30px;
  font-family: 'Suprapower';
  align-self: flex-start;
  transition: background-color 0.25s ease, color 0.25s ease;

  &::after {
    display: none;
  }

  &:visited {
    color: ${colors.BACKGROUND};
  }

  &:hover {
    background-color: ${colors.PRIMARY};
    color: ${colors.TEXT};
  }
`;

const Skill = ({ data }) => {
  const buttonRef = useRef();
  const [listVisible, setListVisible] = useState(false);
  const hardskills = useMemo(() => getHardskills(data), [data]);
  const [contentProps, setContentProps] = useSpring(() => ({
    config: { duration: 250 },
    from: { opacity: 1, display: 'block' },
  }));
  const [itemProps, setItemProps] = useSprings(hardskills.length, () => {
    const duration = Math.floor(Math.random() * 1500) + 250;

    return {
      config: { duration: duration },
      delay: 2500,
      from: {
        opacity: 1,
        marginRight: Math.floor(Math.random() * 10) + 5,
        display: 'flex',
      },
    };
  });
  const [listProps, setListProps] = useSpring(() => {
    return {
      config: { duration: 250 },
      from: { opacity: 0, display: 'none' },
    };
  });

  useEffect(() => {
    setItemProps(() =>
      listVisible
        ? {
            opacity: 1,
            marginRight: 15,
          }
        : { opacity: 0, marginRight: 0 }
    );
    setContentProps(() =>
      listVisible
        ? {
            to: [{ opacity: 0, marginLeft: 10 }, { display: 'none' }],
          }
        : { to: [{ opacity: 1, marginLeft: 0 }, { display: 'block' }] }
    );

    setListProps(() =>
      listVisible
        ? {
            to: [{ opacity: 1 }, { display: 'flex' }],
          }
        : { to: [{ opacity: 0 }, { display: 'none' }] }
    );
  }, [listVisible, setItemProps, setContentProps, setListProps]);

  return (
    <Wrapper>
      <Button
        ref={buttonRef}
        href="#skill"
        onClick={(e) => {
          e.preventDefault();
          setListVisible((prev) => !prev);
        }}
      >
        {listVisible ? 'read more' : 'tl;dr'}
      </Button>
      <ImageWrapper>
        <Img fluid={data.frontmatter.images[0].childImageSharp.fluid} />
      </ImageWrapper>
      <Content
        style={contentProps}
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
      <List style={listProps}>
        {hardskills.map((item, idx) => (
          <animated.li style={itemProps[idx]} key={item || 'things'}>
            <ListItem
              href={`http://www.google.com/search?q=what+is+${item
                .split(' ')
                .join('+')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item || 'things'}
            </ListItem>
          </animated.li>
        ))}
      </List>
    </Wrapper>
  );
};

List.propTypes = {
  items: arrayOf(string),
};

Skill.propTypes = {
  data: PropTypes.object,
};

Skill.defaultProps = {};

export default Skill;
