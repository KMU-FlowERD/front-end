import styled from '@emotion/styled';
import { ReactNode, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const Background = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  justify-content: center;
  align-items: center;
  background: rgba(47, 47, 47, 0.8);
  backdrop-filter: blur(4px);
`;

export const useModal = (children: ReactNode) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const Modal = useMemo(() => {
    if (!isOpen) return null;
    return createPortal(
      <Background onClick={closeModal}>
        <div
          role='button'
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation();
            }
          }}
        >
          {children}
        </div>
      </Background>,
      document.body,
    );
  }, [isOpen, children]);

  return {
    Modal,
    openModal,
    closeModal,
  };
};
