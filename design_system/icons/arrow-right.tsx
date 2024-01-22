import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '..';

interface Props {
  color?: string;
}

export const ArrowRight = ({ color = Colors.grey }: Props) => {
  return <FontAwesomeIcon icon={faArrowCircleRight} color={color} />;
};
