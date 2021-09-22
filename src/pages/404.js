import React from 'react';

import PageWrapper from '../components/PageWrapper';
import SEO from '../components/Seo';
import Link from '../components/Link';

const NotFoundPage = () => (
  <PageWrapper>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist...</p>
    <Link to="/">HOME</Link>
  </PageWrapper>
);

export default NotFoundPage;
