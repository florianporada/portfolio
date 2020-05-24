const getHardskills = (data) => {
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
};

export { getHardskills };
