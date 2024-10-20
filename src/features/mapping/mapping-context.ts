import { useEffect, useRef, useState } from 'react';

import { ERDRelation } from '@/features/erd-project';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [lastRelation, setLastRelation] = useState<ERDRelation | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const openContextMenu = (event: React.MouseEvent, relation: ERDRelation) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
    setLastRelation(relation);
  };

  const closeContextMenu = () => {
    setContextMenu(null);
    setLastRelation(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        closeContextMenu();
      }
    };

    if (contextMenu) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu]);

  return {
    contextMenu,
    lastRelation,
    menuRef,
    openContextMenu,
    closeContextMenu,
  };
};
