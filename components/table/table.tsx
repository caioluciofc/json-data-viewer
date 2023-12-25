'use client'; // This is a client component

import { JsonData } from '@/src/models';
import { Row } from './row';
import { TableHeader } from './header';

interface Props {
    jsonData: JsonData[];
}

export function Table({ jsonData } : Props) {

    return (
        <table>
            <TableHeader jsonData={jsonData} />
          <tbody>
            {jsonData.map((row) => {
              return (
                <Row item={row}/>
              )
            })}
          </tbody>
        </table>
   
    )

}