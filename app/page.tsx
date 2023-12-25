'use client'; 

import Image from 'next/image'
import styles from './page.module.css'
import { useAppContext } from '@/src/app.provider';
import { Table } from '@/components';

export default function Home() {
  const { dataTableState } = useAppContext();

  const { jsonData } = dataTableState;

  return (
    <main className={styles.main}>
      <div>
        {jsonData.length > 0 && <Table jsonData={jsonData} />}
      </div>
    </main>
  )
}
