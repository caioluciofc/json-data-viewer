'use client'; // This is a client component 👈🏽

import { JsonData } from '@/src/models';
import { Row } from './row';
import { TableHeader } from '.';

interface Props {
	jsonData: JsonData[];
}

export function Table({ jsonData }: Props) {
	return (
		<div style={{ width: '100%' }}>
			<table
				style={{
					borderCollapse: 'collapse',
					width: '100%',
				}}>
				<TableHeader jsonData={jsonData} />
				<tbody>
					{jsonData.map((value, index) => (
						<Row key={JSON.stringify(value)} item={value} />
					))}
				</tbody>
			</table>
		</div>
	);
}
