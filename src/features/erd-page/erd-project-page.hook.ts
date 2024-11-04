import { useState, useEffect, useCallback, useMemo } from 'react';

import { useDrawToolsStore } from '@/features/draw-tools';
import { ERDRelation } from '@/features/erd-project';
import { useERDProjectStore } from '@/providers';

export function useCanvasSize() {
  const projectWidth = useERDProjectStore((state) => state.width);
  const projectHeight = useERDProjectStore((state) => state.height);
  const updateCanvasSize = useERDProjectStore(
    (state) => state.updateCanvasSize,
  );

  const handleResize = useCallback(() => {
    if (
      window.innerWidth > projectWidth ||
      window.innerHeight > projectHeight
    ) {
      updateCanvasSize({
        width: Math.max(window.innerWidth, projectWidth),
        height: Math.max(window.innerHeight, projectHeight),
      });
    }
  }, [projectWidth, projectHeight, updateCanvasSize]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    handleResize();
  }, [handleResize]);

  return { projectWidth, projectHeight, handleResize };
}

export function usePageMove() {
  const [pageMove, setPageMove] = useState(false);
  const [initPagePosition, setInitPagePosition] = useState({
    left: -1,
    top: -1,
  });
  const [scrollPagePosition, setScrollPagePosition] = useState({
    left: -1,
    top: -1,
  });
  const cursor = useDrawToolsStore((state) => state.cursor);

  useEffect(() => {
    const handleMouseDown = (e: { pageX: number; pageY: number }) => {
      const { pageX, pageY } = e;
      if (cursor === 'POINTER' && !pageMove) {
        setPageMove(true);
        setInitPagePosition({ left: pageX, top: pageY });
        setScrollPagePosition({ left: window.scrollX, top: window.scrollY });
      }
    };

    const handleMouseMove = (e: { pageX: number; pageY: number }) => {
      if (!pageMove) return;
      const { pageX, pageY } = e;
      const dx = pageX - initPagePosition.left;
      const dy = pageY - initPagePosition.top;
      window.scrollTo({
        left: scrollPagePosition.left - dx,
        top: scrollPagePosition.top - dy,
        behavior: 'instant',
      });
    };

    const handleMouseUp = () => {
      if (pageMove) setPageMove(false);
    };

    if (cursor === 'POINTER') {
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursor, pageMove, initPagePosition, scrollPagePosition]);

  return { pageMove, setPageMove };
}

export function useRelationChange() {
  const tables = useERDProjectStore((state) => state.tables);
  const relations = useERDProjectStore((state) => state.relations);

  const changedRelation: ERDRelation[] = useMemo(() => {
    const toChangeRelations: ERDRelation[] = [];

    tables.forEach((table) => {
      relations[table.id]?.forEach((relation) => {
        if (
          relation.multiplicity.from !== undefined &&
          relation.type !== undefined
        )
          return;

        if (!toChangeRelations.includes(relation))
          toChangeRelations.push(relation);
      });
    });

    return toChangeRelations;
  }, [relations, tables]);

  return changedRelation;
}
