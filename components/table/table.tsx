'use client'; // This is a client component 👈🏽

import React from 'react';
import { JsonData } from '@/src/models';
import { Row } from './row';
import { TableHeader } from '.';
import { styles } from './table.style';

interface Props {
  jsonData: JsonData[];
}

export function Table({ jsonData }: Props) {
  return (
    <div style={styles.main}>
      <table style={styles.table}>
        <TableHeader jsonData={jsonData} />
        <tbody>
          {jsonData.map((value) => (
            <Row key={JSON.stringify(value)} item={value} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
