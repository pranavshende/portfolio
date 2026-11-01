import React from 'react';
import { DoodleSidebar } from './DoodleSidebar';

interface DoodleLayoutProps {
  children: React.ReactNode;
}

export const DoodleLayout: React.FC<DoodleLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-zinc-900 font-sans selection:bg-[#fef08a] selection:text-zinc-900">
      <DoodleSidebar />

      {/* Main Content Area */}
      <div className="md:pl-60 flex flex-col min-h-screen">
        <main className="flex-1 w-full max-w-5xl px-6 sm:px-12 lg:px-16 py-8 sm:py-12 mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
