'use client'; // This is a client component 👈🏽

import React from 'react';
import { JsonData } from '@/src/models';
import { styles } from './header.style';

interface Props {
  jsonData: JsonData[];
}

export function TableHeader({ jsonData }: Props) {
  return (
    <thead style={styles.thead}>
      <tr>
        <th></th>
        {Object.keys(jsonData[0].data).map((value, index) => (
          <th key={index}>{value}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
}
