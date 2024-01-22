import { useDataTable } from './states/data-table.state';
import useAuthState from './states/authentication.state';
import useWebsocketsState from './states/websockets.state';
import useGameState from './states/game.state';

type DataTableActions = ReturnType<typeof useDataTable>[1];

export interface AppProviderType extends DataTableActions {
  dataTableState: ReturnType<typeof useDataTable>[0];
  authState: ReturnType<typeof useAuthState>[0];
  socketState: ReturnType<typeof useWebsocketsState>[0];
  gameState: ReturnType<typeof useGameState>[0];
}
