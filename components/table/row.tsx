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

export function Row({
	item,
	index,
	ancestors = [],
}: {
	item: JsonData;
	index: number;
	ancestors: number[];
}) {
	const { removeItem } = useAppContext();

	const [selected, setSelected] = useState(false);

	const _columns = Object.keys(item.data);
	const _hasKids = Object.keys(item.kids ?? []).length > 0 ? true : false;
	const _keys = item.kids ? Object.keys(item.data) : [];
	const _kids = item.kids ? Object.values(item.kids)[0]?.records : [];
	const _kidsName = item.kids ? Object.keys(item.kids)[0] : '';
	const _ancestors: number[] = [...ancestors, index];
	function handleClick() {
		setSelected((selected) => !selected);
	}
	function _delete() {
		removeItem(_ancestors);
	}

	return (
		<>
			<tr className="bg-white border-y-2 hover:bg-gray-50">
				<td className="w-8 p-6">
					{_hasKids && (
						<div className="flex items-center" onClick={() => handleClick()}>
							{selected ? <ArrowDown /> : <ArrowRight />}
						</div>
					)}
				</td>
				{_columns.map((value, index) => (
					<td key={index} className="text-sm">
						{item.data[value]}
					</td>
				))}
				<td className="w-8 p-6">
					<div onClick={_delete}>
						<IconCrossMark />
					</div>
				</td>
			</tr>
			{selected && _kids?.length > 0 && (
				<tr>
					<td></td>
					<td colSpan={_keys.length + 1}>
						<div>
							<Table
								jsonData={_kids}
								ancestors={_ancestors}
								tableName={_kidsName}
							/>
						</div>
					</td>
				</tr>
			)}
		</>
	);
}
