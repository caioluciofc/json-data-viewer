'use client'; // This is a client component 👈🏽

import { useState } from 'react';
import { JsonData } from '@/src/models';
import { Table } from './table';
import {
	ArrowDown,
	ArrowRight,
	FontSizes,
	IconCrossMark,
	Paddings,
} from '@/design_system';
import { useAppContext } from '@/src/app.provider';

export function Row({ item }: { item: JsonData }) {
	const { removeItem } = useAppContext();

	const [selected, setSelected] = useState(false);

	const _columns = Object.keys(item.data);
	const _hasKids = Object.keys(item.kids ?? []).length > 0 ? true : false;
	const _keys = item.kids ? Object.keys(item.data) : [];
	const _kids = item.kids ? Object.values(item.kids)[0]?.records : [];

	function handleClick() {
		setSelected((selected) => !selected);
	}

  function _delete() {
		removeItem(item);
	}

  return (
		<>
			<tr style={{ height: 50 }}>
				<td>
					{_hasKids && (
						<div
							style={{ padding: Paddings.micro }}
							onClick={() => handleClick()}>
							{selected ? <ArrowDown /> : <ArrowRight />}
						</div>
					)}
				</td>
				{_columns.map((value, index) => (
					<td key={index} style={{ fontSize: FontSizes.small }}>
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
				<tr style={{ paddingLeft: '20px' }}>
					<td></td>
					<td colSpan={_keys.length + 1}>
						<div style={{ width: '100%' }}>
							<Table jsonData={_kids} />
						</div>
					</td>
				</tr>
			)}
		</>
	);
}
