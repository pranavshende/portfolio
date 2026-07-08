import React from 'react';
import { useMode } from '../contexts/ModeContext';
import AboutScreenDev from './AboutScreenDev';
import AboutScreenRecruiter from './AboutScreenRecruiter';

export const AboutScreen = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <AboutScreenDev {...props} /> : <AboutScreenRecruiter {...props} />;
};

export default AboutScreen;
