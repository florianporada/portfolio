import React from 'react';

import PageWrapper from '../components/PageWrapper';
import SEO from '../components/Seo';
import TransitionLink from '../components/TransitionLink';

const NotFoundPage = () => (
  <PageWrapper>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist...</p>
    <TransitionLink to="/">HOME</TransitionLink>
  </PageWrapper>
);

export default NotFoundPage;
