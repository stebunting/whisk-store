// Requirements
import React, { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface HeaderPayload {
  header: string,
  title: string,
  description: string
}

function useHeaders(headers: HeaderPayload): ReactElement {
  const { header, title, description } = headers;

  useEffect(() => {
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle != null) {
      pageTitle.textContent = header;
    }
  });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default useHeaders;
