import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

function useHeaders({ header, title, description }) {
  useEffect(() => {
    document.getElementById('pageTitle').textContent = header;
  });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default useHeaders;
