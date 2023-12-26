'use client'; // This is a client component 👈🏽

import React from 'react';
import { styles } from './page.style';
import { useAppContext } from '@/src/app.provider';
import { Table } from '@/components';

export default function HomeView() {
	const { dataTableState } = useAppContext();

	const { jsonData } = dataTableState;

	return (
		<main className="bg-white p-4 h-screen">
			<div>
				{jsonData.length > 0 && (
					<Table jsonData={jsonData} tableName="Main Table" ancestors={[]} />
				)}
			</div>
		</main>
	);
}
