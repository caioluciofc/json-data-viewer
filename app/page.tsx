import Image from 'next/image'
import styles from './page.module.css'
import { useAppContext } from '@/src/app.provider';
import { Colors, Paddings } from '@/design_system';
import jsonData from '../example-data.json';

export default function Home() {
  // const { dataTableState } = useAppContext();

  // const { jsonData } = dataTableState;

  const tableColumns = Object.keys(jsonData[0].data)

  return (
    <main className={styles.main}>
        <table>
        <thead>
          <tr>
            <th>
              <th></th>
              {tableColumns.map((value, index) => (
                <th key={index}>{value}</th>
              ))}
              <th></th>
            </th>
          </tr>
        </thead>
          <tbody>
            {jsonData.map((row) => {
              return (
                <tr>
                  {tableColumns.map((column) => (
                    <td>{row.data[column]}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
    </main>
  )
}
