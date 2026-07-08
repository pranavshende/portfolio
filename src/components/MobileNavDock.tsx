import React from 'react';
import { useMode } from '../contexts/ModeContext';
import MobileNavDockDev, { DesktopSidebar as DesktopSidebarDev, TabId } from './MobileNavDockDev';
import MobileNavDockRecruiter, { DesktopSidebar as DesktopSidebarRecruiter } from './MobileNavDockRecruiter';

export type { TabId };

export const DesktopSidebar = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <DesktopSidebarDev {...props} /> : <DesktopSidebarRecruiter {...props} />;
};

export const MobileBottomDock = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <MobileNavDockDev {...props} /> : <MobileNavDockRecruiter {...props} />;
};

export default MobileBottomDock;
