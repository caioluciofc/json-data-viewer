'use client'; // This is a client component

import { useState } from 'react';
import { JsonData } from '@/src/models';
import { useAppContext } from '@/src/app.provider';
import { IconPencil } from '@/design_system';
import { Table } from '..';
import { IconCrossMark } from '@/design_system';

export function Row({ item } : { item : JsonData }) {
    const { removeItem } = useAppContext()

    const [selected, setSelected] = useState(false);
  
    const _columns = Object.keys(item.data)
    const _hasKids = Object.keys(item.kids ?? []).length > 0 ? true : false;
    const _kids = item.kids ? Object.values(item.kids)[0]?.records : [];

    function handleClick() {
      setSelected((selected) => !selected);
    }

    function _delete() {
      removeItem(item);
    }

    return (
      <>
        <tr style={{height : 50}}>

        <td>
          {_hasKids && (
            <div
            onClick={() => handleClick()}>
              { <IconPencil /> }
            </div>
          )}
        </td>
          {_columns.map((column) => (
            <td>{item.data[column]}</td>
          ))}
        <td>
          <div onClick={_delete}>
            <IconCrossMark />
          </div>
        </td>
        </tr>
        {selected && _hasKids && (
          <tr>
            <td></td>
            <td>
              <div>
                <Table jsonData={_kids} />
              </div>
            </td>
          </tr>
        )}
      </>
    )
}