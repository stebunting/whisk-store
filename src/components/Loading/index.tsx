// Requirements
import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: Array<ReactNode> | ReactNode
}

function Loading(props: Props): ReactElement {
  const { children } = props;

  return (
    <div>
      {children}
      Loading Store...
    </div>
  );
}

export default Loading;
