'use client'; // This is a client component 👈🏽

import { Colors, FontSizes } from '@/design_system';
import { CustomStyle } from '@/src/models';

export const styles: CustomStyle = {
  thead: {
    height: 50,
    color: Colors.grey,
    fontSize: FontSizes.small,
    backgroundColor: Colors.grey + 50,
  },
};
