'use client'; // This is a client component 👈🏽

import { Colors, FontSizes, Paddings } from '@/design_system';
import { CustomStyle } from '@/src/models';
import React from 'react';

export const styles: CustomStyle = {
  main: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '98vh',
    backgroundColor: Colors.black,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingBottom: Paddings.large,
  },
  container: {
    padding: Paddings.large,
    width: '70vw',
    maxWidth: 500,
    minHeight: 150,
    borderCollapse: 'collapse',
    borderRadius: 20,
    backgroundColor: Colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: '100%',
    marginTop: Paddings.micro,
    minHeight: 50,
    fontSize: FontSizes.large,
    color: Colors.white,
    textTransform: 'uppercase',
    borderCollapse: 'collapse',
    borderRadius: 16,
    backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
};
