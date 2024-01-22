import { useDataTable } from './states/data-table.state';
import useAuthState from './states/authentication.state';
import useWebsocketsState from './states/websockets.state';
import useGameState from './states/game.state';

type DataTableActions = ReturnType<typeof useDataTable>[1];
type AuthActions = ReturnType<typeof useAuthState>[1];
type SocketActions = ReturnType<typeof useWebsocketsState>[1];
type GameActions = ReturnType<typeof useGameState>[1];

export interface AppProviderType extends DataTableActions, AuthActions, SocketActions, GameActions {
  dataTableState: ReturnType<typeof useDataTable>[0];
  authState: ReturnType<typeof useAuthState>[0];
  socketState: ReturnType<typeof useWebsocketsState>[0];
  gameState: ReturnType<typeof useGameState>[0];
}
