'use client'; // This is a client component 👈🏽

import React, { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import DevelopmentError from './errors/DevelopmentError';
import { AppProviderType } from './app.provider.types';
import { useDataTable } from './states/data-table.state';
import useAuthState from './states/authentication.state';
import useWebsocketsState from './states/websockets.state';
import useGameState, { GameState } from './states/game.state';
import { useOldManState } from './states/old-man.state';

export const AppContext = createContext<AppProviderType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new DevelopmentError('You are trying to useAppContext outside App Provider.');
  }

  return context;
}

interface Props {
  children: ReactNode;
}

export default function AppProvider({ children }: Props) {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
  //  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
  const [dataTableState, dataTableActions] = useDataTable();
  const [authState, authActions] = useAuthState();
  const [socketState, socketActions] = useWebsocketsState();
  const [gameState, gameActions] = useGameState();
  const [oldManState, oldManActions] = useOldManState();
  const gameStateRef = useRef<GameState>();

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (authState.authToken && !socketState.socket) {
      socketActions?.connectSocket(authState.authToken)?.then(() => {});
    }
  }, [authState, socketState]);

  useEffect(() => {
    if (socketState.gameStatus === 'JOINED' && socketState.socket) {
      gameActions.getNextQuestion(socketState.socket);
    }
  }, [socketState.gameStatus]);

  useEffect(() => {
    if (socketState.socket) {
      const io = socketState.socket;

      const onStartGame = (response : any) => {
        gameActions.getNextQuestion(io);
      };

      const onNextRound = (response: any) => {
        if (response.score) {
          gameActions.setGameScore(response.score)
        }
        if (response.roundStatus == 'FINISHED') {
          if (response.result === 'DRAW') {
            gameActions.setGameResult('draw');
          } else if (response.result === authState.userName) {
            gameActions.setGameResult('win');
          } else {
            gameActions.setGameResult('lost');
          }
        } else if (gameStateRef?.current?.waitingNextQuestion) {
          gameActions.getNextQuestion(io);
        }
      };

      io.on('next-round', onNextRound);
      io.on('start-game', onStartGame);
    }
  }, [socketState.socket]);

  useEffect(() => {
    if (socketState.roomId) {
      console.log(`Setting room id to ${socketState.roomId}`);
      gameActions.setRoomId(socketState.roomId);
    }
  }, [socketState.roomId]);

  //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
  //  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
  //  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
  const AppStates = {
    dataTableState,
    authState,
    socketState,
    gameState,
    oldManState
  };

  //  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  const AppActions = {
    ...dataTableActions,
    ...authActions,
    ...socketActions,
    ...gameActions,
    ...oldManActions,
  };

  return (
    <AppContext.Provider value={{ ...AppStates, ...AppActions }}>{children}</AppContext.Provider>
  );
}
