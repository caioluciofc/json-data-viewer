import Image from 'next/image'
import styles from './page.module.css'
import { useAppContext } from '@/src/app.provider';
import { Colors, Paddings } from '@/design_system';
import jsonData from '../example-data.json';
import { Table } from '@/components';

export default function Home() {
  // const { dataTableState } = useAppContext();

  // const { jsonData } = dataTableState;

  const tableColumns = Object.keys(jsonData[0].data)

  return (
    <main className={styles.main}>
      <div>
        <Table jsonData={jsonData} />
      </div>
    </main>
  )
}
