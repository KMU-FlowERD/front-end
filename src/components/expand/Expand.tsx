import type { ReactNode } from 'react';
import React, { useState } from 'react';

import { styles } from './Expand.styles';

interface ExpandProps {
  text: string;
  children: undefined | ReactNode;
  deleteIcon: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export function Expand({
  text,
  children,
  deleteIcon,
  onClick,
  onDelete,
}: ExpandProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);

    if (onClick) onClick();
  };

  return (
    <styles.displayWrapper>
      <styles.mainNode onClick={handleClick}>
        <ExpandIcon open={open} />
        {text}
        {deleteIcon && (
          <styles.deleteButton onClick={onDelete}>🗑</styles.deleteButton>
        )}
      </styles.mainNode>
      <styles.childNode>{open && children}</styles.childNode>
    </styles.displayWrapper>
  );
}

function ExpandIcon({ open }: { open: boolean }) {
  return (
    <styles.expandButton $open={open}>
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M9 5L15 12L9 19'
          stroke='#ededed'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </styles.expandButton>
  );
}
