'use client' // This is a client component

import { JsonData } from '@/src/models';

interface Props {
    jsonData : JsonData[];
}

export function TableHeader({ jsonData } : Props) {
    const tableColumns = Object.keys(jsonData[0].data)

    return (
        <thead>
        <tr>
          <th></th>
            {tableColumns.map((value, index) => (
              <th key={index}>{value}</th>
            ))}
        </tr>
      </thead>

    )
}