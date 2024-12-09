import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import '@/shared/axios.config';
import { ERDProjectProvider, TanStackQueryProvider } from '@/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FlowERD',
  description: 'Feel free to create ERD diagrams with FlowERD!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko-kr'>
      <body className={inter.className}>
        <TanStackQueryProvider>
          <ERDProjectProvider>{children}</ERDProjectProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
