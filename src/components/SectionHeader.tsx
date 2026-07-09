import React from 'react';

interface SectionHeaderProps {
  title: string;
}

export const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-6 mt-12 w-full">
      <div className="w-[3px] h-5 bg-emerald-500 rounded-full"></div>
      <h2 className="font-serif italic text-lg sm:text-xl text-white tracking-wide">{title}</h2>
    </div>
  );
};

export default SectionHeader;
