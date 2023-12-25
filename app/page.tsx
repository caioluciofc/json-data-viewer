"use client"; // This is a client component 👈🏽

import React from "react";
import { styles } from "./page.style";
import { useAppContext } from "@/src/app.provider";
import { Table } from "@/components";

export default function HomeView() {
  const { dataTableState } = useAppContext();

  const { jsonData } = dataTableState;

  return (
    <main style={styles.main}>
      <div style={styles.body}>{jsonData.length > 0 && <Table jsonData={jsonData} />}</div>
    </main>
  );
}
