import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '../context/AppContext';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard Application',
  description: 'A modern React.js dashboard application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <Header />
              
              {/* Page Content */}
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
                {children}
              </main>
            </div>
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
