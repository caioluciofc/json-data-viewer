'use client'; // This is a client component 👈🏽

import React, { useState } from 'react';
import { JsonData } from '@/src/models';
import { Table } from './table';
import { ArrowDown, ArrowRight, IconCrossMark } from '@/design_system';
import { useAppContext } from '@/src/app.provider';
import { styles } from './row.style';

export function Row({ item }: { item: JsonData }) {
  const { removeItem } = useAppContext();

  const [selected, setSelected] = useState(false);

  const listRecords = Object.values(item.kids ?? {});

  const totalKids = listRecords.reduce((acc, curr) => {
    return [...acc, ...curr.records];
  }, [] as JsonData[]).length;

  const _dataKeys = Object.keys(item.data);
  const _hasKids = totalKids > 0 ? true : false;
  const _keys = item.kids ? Object.keys(item.data) : [];
  const _kids = item.kids ? Object.values(item.kids)[0]?.records : [];

  function _delete() {
    removeItem(item);
  }

  function handleClick() {
    setSelected((selected) => !selected);
  }

  return (
    <>
      <tr style={styles.tr}>
        <td>
          {_hasKids && item.kids && (
            <div style={styles.arrow} onClick={() => handleClick()}>
              {selected ? <ArrowDown /> : <ArrowRight />}
            </div>
          )}
        </td>
        {_dataKeys.map((value, index) => (
          <td key={index} style={styles.value}>
            {item.data[value]}
          </td>
        ))}
        <td>
          <div onClick={_delete}>
            <IconCrossMark />
          </div>
        </td>
      </tr>
      {selected && _kids?.length > 0 && (
        <tr style={styles.trKid}>
          <td></td>
          <td colSpan={_keys?.length + 1}>
            <div style={styles.tableKid}>
              <Table jsonData={_kids} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
