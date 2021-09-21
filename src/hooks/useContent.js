const useContent = (html) => {
  const [excerpt, content] =
    html.split('<!-- end -->').length > 1
      ? html.split('<!-- end -->')
      : [undefined, html];

  return [excerpt, content];
};

export default useContent;
