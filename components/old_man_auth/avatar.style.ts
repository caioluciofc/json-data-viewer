'use client'; // This is a client component 👈🏽

import { Colors, FontSizes } from '@/design_system';
import { CustomStyle } from '@/src/models';

export const styles: CustomStyle = {
  main: {
    width: '100%',
    height: 500,
    borderRadius: 250,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: 500,
    borderRadius: 250,
  },
};
