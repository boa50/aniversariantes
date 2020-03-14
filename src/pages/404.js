import React, { Fragment } from 'react';

import Header from '../components/header';
import SEO from "../components/seo";

const NotFound = () => {
  return (
      <Fragment>
          <SEO title="Not Found" />
          <Header />
          <div className="container">
              <h1>404 - Página Não Encontrada</h1>
          </div>
      </Fragment>
  )
}

export default NotFound;
