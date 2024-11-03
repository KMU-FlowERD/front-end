import styled from '@emotion/styled';
import type { ReactNode} from 'react';
import { useMemo, useState, createContext, useContext } from 'react';
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

interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = (children: ReactNode) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const contextValue = useMemo(() => ({ openModal, closeModal }), []);

  const Modal = useMemo(() => {
    if (!isOpen) return null;
    return createPortal(
      <ModalContext.Provider value={contextValue}>
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
        </Background>
      </ModalContext.Provider>,
      document.body,
    );
  }, [isOpen, children, contextValue]);

  return {
    Modal,
    openModal,
    closeModal,
  };
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
