'use client'; // This is a client component 👈🏽

import { JsonData } from '@/src/models';
import { Colors, FontSizes } from '@/design_system';

interface Props {
	jsonData: JsonData[];
}

export function TableHeader({ jsonData }: Props) {
	return (
		<thead className="text-sm text-zinc-600 bg-stone-300">
			<tr className="w-8 p-6">
				<th></th>
				{Object.keys(jsonData[0].data).map((value, index) => (
					<th key={index} className="p-4">
						{value}{' '}
					</th>
				))}
				<th></th>
			</tr>
		</thead>
	);
}
