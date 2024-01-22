import React from 'react';
import { Colors, FontSizes } from '../_constants';

interface Props {
  text: string;
  color?: string;
  textAlign?: 'center' | 'left' | 'right';
}

export const TextLarge = ({ text, color = Colors.black, textAlign }: Props) => {
  return <span style={{ color, textAlign, fontSize: FontSizes.large }}>{text}</span>;
};
