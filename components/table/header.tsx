'use client' // This is a client component

import { JsonData } from '@/src/models';

interface Props {
    jsonData : JsonData[];
}

export function TableHeader({ jsonData } : Props) {
    return (
        <thead>
        <tr>
          <th></th>
            {Object.keys(jsonData[0].data).map((value, index) => (
              <th key={index}>{value}</th>
            ))}
          <th></th>
        </tr>
      </thead>

    )
}