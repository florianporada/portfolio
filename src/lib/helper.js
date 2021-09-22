function getHardskills(data) {
  const children = data.htmlAst.children.reduce((result, current) => {
    if (current.children) {
      return [...result, ...current.children];
    } else {
      return result;
    }
  }, []);

  const result = children
    .filter((el) => {
      return el.tagName === 'strong';
    })
    .map((el) => {
      return el.children[0].value;
    });

  return [...result, ...data.frontmatter.hardskills].reduce(
    (result, current) => {
      return result.includes(current) ? result : [...result, current];
    },
    []
  );
}

function getNavLink(link) {
  if (link.toLowerCase() === 'home') {
    return '/';
  }

  if (link.toLowerCase() === 'contact') {
    return '#contact';
  }

  return `/${link.toLowerCase()}`;
}

const isBrowser = () => typeof window !== 'undefined';

export { getHardskills, getNavLink, isBrowser };
