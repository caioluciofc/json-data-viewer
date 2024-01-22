import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '..';

export const ArrowDown = () => {
  return <FontAwesomeIcon icon={faArrowCircleDown} color={Colors.grey} />;
};
