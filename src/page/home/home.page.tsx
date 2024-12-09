'use client';

import { useLayoutEffect } from 'react';

import { styles } from './home.page.styles';

import { Sidebar } from '@/components/home';
import { ProjectList } from '@/components/home/project-list';
import { SignInModal } from '@/components/home/signin';
import { useAuthStore } from '@/features/auth';
import { useModal } from '@/features/modal';

export function HomePage() {
  const { accessToken } = useAuthStore();

  const { Modal: SignIn, openModal: openSignInModal, closeModal: closeSignInModal } = useModal(<SignInModal />);

  useLayoutEffect(() => {
    if (!accessToken) {
      openSignInModal();
    } else {
      closeSignInModal();
    }
  }, [accessToken, closeSignInModal, openSignInModal]);

  return (
    <styles.container>
      <Sidebar />
      <ProjectList />
      {SignIn}
    </styles.container>
  );
}
