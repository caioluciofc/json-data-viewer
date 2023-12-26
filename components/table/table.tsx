'use client'; // This is a client component 👈🏽

import { JsonData } from '@/src/models';
import { Row } from './row';
import { TableHeader } from '.';

interface Props {
	jsonData: JsonData[];
	ancestors : number[];
	tableName : string;
}

export function Table({ jsonData, ancestors = [], tableName }: Props) {
	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<h1 className='font-mono font-bold text-gray-800 my-2 pl-4 uppercase'>{tableName}</h1>
			<table
				className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<TableHeader jsonData={jsonData} />
				<tbody>
					{jsonData.map((value, index) => (
						<Row key={JSON.stringify(value)} item={value} index={index} ancestors={ancestors}/>
					))}
				</tbody>
			</table>
		</div>
	);
}
