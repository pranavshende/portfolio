import React from 'react';
import { useMode } from '../contexts/ModeContext';
import ContactScreenDev from './ContactScreenDev';
import ContactScreenRecruiter from './ContactScreenRecruiter';

export const ContactScreen = (props: any) => {
  const { mode } = useMode();
  return mode === 'developer' ? <ContactScreenDev {...props} /> : <ContactScreenRecruiter {...props} />;
};

export default ContactScreen;
