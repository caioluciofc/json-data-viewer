'use client'; // This is a client component 👈🏽

import styles from './page.module.css';
import { useAppContext } from '@/src/app.provider';

import { Table } from '@/components/table/table';
import { Colors, Paddings } from '@/design_system';

export default function HomeView() {
	const { dataTableState } = useAppContext();

	const { jsonData } = dataTableState;

	return (
		<main
			style={{
				backgroundColor: Colors.background,
				padding: Paddings.medium,
				height: '100vh',
			}}>

			<div
				style={{
					backgroundColor: Colors.white,
					padding: Paddings.medium,
					borderRadius: 10,
				}}>
				{jsonData.length > 0 && <Table jsonData={jsonData} />}
			</div>
		</main>
	);
}
