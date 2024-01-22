'use client'; // This is a client component 👈🏽

import { Colors, Paddings } from '@/design_system';
import { CustomStyle } from '@/src/models';

export const styles: CustomStyle = {
  main: {
    backgroundColor: Colors.background,
    padding: Paddings.medium,
    height: '100vh',
  },
  body: {
    backgroundColor: Colors.white,
    padding: Paddings.medium,
    borderRadius: 10,
    overflowX: 'auto',
  },
};
