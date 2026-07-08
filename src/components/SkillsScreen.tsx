import React from 'react';
import { useMode } from '../contexts/ModeContext';
import SkillsScreenDev from './SkillsScreenDev';
import SkillsScreenRecruiter from './SkillsScreenRecruiter';

export const SkillsScreen = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <SkillsScreenDev {...props} /> : <SkillsScreenRecruiter {...props} />;
};

export default SkillsScreen;
