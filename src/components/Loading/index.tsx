// Requirements
import React, { ReactNode } from 'react';

interface Props {
  children: Array<ReactNode> | ReactNode
}

function Loading(props: Props) {
  return (
    <div>
      {props.children}
      Loading Store...
    </div>
  );
}

export default Loading;
