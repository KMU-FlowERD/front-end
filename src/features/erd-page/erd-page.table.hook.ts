import { useEffect, useState } from 'react';

interface Position {
  left: number;
  top: number;
}

export function useDrag(onPositionChange: (pos: Position) => void) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState<Position>({ left: 0, top: 0 });

  const handleMouseDown = (
    e: React.MouseEvent,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDragging(true);
      setOffset({
        left: e.clientX - rect.left,
        top: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newPos = {
          left: e.pageX - offset.left,
          top: e.pageY - offset.top,
        };
        onPositionChange(newPos);
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, offset.left, offset.top, onPositionChange]);

  return { handleMouseDown };
}

export function useOutsideClick(
  refs: React.RefObject<HTMLElement | SVGElement>[],
  callback: () => void,
  active: boolean,
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!refs.some((ref) => ref.current?.contains(e.target as Node))) {
        callback();
      }
    };

    if (active) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, active]);
}

export function useIconOutsideClick(
  refs: React.RefObject<HTMLElement | SVGElement>[],
  callback: () => void,
  active: boolean,
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!refs.some((ref) => ref.current?.contains(e.target as Node))) {
        callback();
      }
    };

    if (active) {
      window.addEventListener('mousedown', handleClickOutside);
    } else {
      window.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, active]);
}
