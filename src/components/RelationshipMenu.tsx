import styled from '@emotion/styled';
import { MutableRefObject } from 'react';

interface RelationshipMenuProps {
  position: { x: number; y: number };
  menuRef: MutableRefObject<HTMLDivElement | null>;
  // deleteRelation: (relation: ERDRelation) => void;
  // updateRelation: (relation: ERDRelation) => void;
  onClose: () => void;
}

export function RelationshipMenu({
  position,
  menuRef,
  // deleteRelation,
  // updateRelation,
  onClose,
}: RelationshipMenuProps) {
  const handleMenuItemClick = (
    action: 'delete' | 'add/pk' | 'add' | 'edit',
  ) => {
    switch (action) {
      default:
        break;
    }

    onClose();
  };

  return (
    <styles.menu ref={menuRef} $pos={{ left: position.x, top: position.y }}>
      <styles.menuItem onClick={() => handleMenuItemClick('delete')}>
        관계 삭제
      </styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('add/pk')}>
        부모 null 허용
      </styles.menuItem>
      <styles.menuItem onClick={() => handleMenuItemClick('add')}>
        자식 null 허용
      </styles.menuItem>
    </styles.menu>
  );
}

const styles = {
  menu: styled.div<{ $pos: { left: number; top: number } }>`
    position: absolute;
    left: ${({ $pos }) => `${$pos.left}px`};
    top: ${({ $pos }) => `${$pos.top}px`};
    background-color: #333;
    border: 1px solid #444;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 1;
  `,

  menuItem: styled.div`
    padding: 8px 16px;
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  `,
};
