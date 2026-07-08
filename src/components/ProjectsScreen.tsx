import React from 'react';
import { useMode } from '../contexts/ModeContext';
import ProjectsScreenDev from './ProjectsScreenDev';
import ProjectsScreenRecruiter from './ProjectsScreenRecruiter';

export const ProjectsScreen = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <ProjectsScreenDev {...props} /> : <ProjectsScreenRecruiter {...props} />;
};

export default ProjectsScreen;
