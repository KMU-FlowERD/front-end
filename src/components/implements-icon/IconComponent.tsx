'use client';

import styled from '@emotion/styled';
import { useState } from 'react';

export function IconComponent({
  iconShape,
}: {
  iconShape: (fill: string) => JSX.Element;
}) {
  const [fill, setFill] = useState<string>('#aaa');

  const IconMouseEnter = () => {
    setFill('#ededed');
  };

  const IconMouseLeave = () => {
    setFill('#aaa');
  };

  return (
    <styles.container
      onMouseEnter={IconMouseEnter}
      onMouseLeave={IconMouseLeave}
    >
      {iconShape(fill)}
    </styles.container>
  );
}

const styles = {
  container: styled.div`
    user-select: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
