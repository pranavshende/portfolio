import React from 'react';
import { useMode } from '../contexts/ModeContext';
import HomeScreenDev from './HomeScreenDev';
import HomeScreenRecruiter from './HomeScreenRecruiter';

export const HomeScreen = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <HomeScreenDev {...props} /> : <HomeScreenRecruiter {...props} />;
};

export default HomeScreen;
