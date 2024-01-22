import { CustomStyle } from '@/src/models';
import React from 'react';
import { Colors, FontSizes, Paddings } from '..';

interface Props {
  text: string;
  onClick: () => void;
  isLoading: boolean;
}

export function TextButton({ text, onClick, isLoading }: Props) {
  return (
    <div style={styles.button} onClick={() => !isLoading && onClick()}>
      {text}
    </div>
  );
}

const styles: CustomStyle = {
  button: {
    width: '100%',
    marginTop: Paddings.micro,
    minHeight: 50,
    fontSize: FontSizes.large,
    color: Colors.primary,
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    borderCollapse: 'collapse',
    borderRadius: 16,
    // backgroundColor: Colors.primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
};
