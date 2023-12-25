'use client'; // This is a client component

import { useState } from 'react';
import { JsonData } from '@/src/models';
import { useAppContext } from '@/src/app.provider';

export function Row({ item } : { item : JsonData }) {
    const _columns = Object.keys(item.data)
    const _hasKids = Object.keys(item.kids ?? []).length > 0 ? true : false;

    return (
        <tr>
        {_columns.map((column) => (
          <td>{item.data[column]}</td>
        ))}
      </tr>
    )
}