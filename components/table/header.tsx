'use client'; // This is a client component 👈🏽

import { JsonData } from '@/src/models';
import { Colors, FontSizes } from '@/design_system';

interface Props {
	jsonData: JsonData[];
}

export function TableHeader({ jsonData }: Props) {
	return (
		<thead
			style={{
				height: 50,
				color: Colors.grey,
				fontSize: FontSizes.small,
				backgroundColor: Colors.grey + 50,
			}}>
			<tr>
				<th></th>
				{Object.keys(jsonData[0].data).map((value, index) => (
					<th key={index}>{value}</th>
				))}
				<th></th>
			</tr>
		</thead>
	);
}
