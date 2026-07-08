import React from 'react';
import { useMode } from '../contexts/ModeContext';
import ExperienceScreenDev from './ExperienceScreenDev';
import ExperienceScreenRecruiter from './ExperienceScreenRecruiter';

export const ExperienceScreen = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <ExperienceScreenDev {...props} /> : <ExperienceScreenRecruiter {...props} />;
};

export default ExperienceScreen;
