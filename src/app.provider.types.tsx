import { useDataTable } from "./states/data-table-state";

type DataTableActions = ReturnType<typeof useDataTable>[1];

export interface AppProviderType extends DataTableActions {
    dataTableState: ReturnType<typeof useDataTable>[0];
}