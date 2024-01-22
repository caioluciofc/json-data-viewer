'use client'; // This is a client component 👈🏽

import { FontSizes, Paddings } from '@/design_system';
import { CustomStyle } from '@/src/models';

export const styles: CustomStyle = {
  tr: {
    height: 50,
  },
  arrow: {
    padding: Paddings.micro,
  },
  value: {
    fontSize: FontSizes.small,
  },
  trKid: {
    paddingLeft: Paddings.large,
  },
  tableKid: {
    width: '100%',
  },
};
