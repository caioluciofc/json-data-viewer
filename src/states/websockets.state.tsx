import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { gameService } from '../services/game.service';

interface WebsocketState {
  socket?: Socket;
  roomId?: string;
  gameStatus?: string;
}

const url = 'https://trivia-master.fly.dev';

export default function useWebsocketsState() {
  //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  const [socketState, setSocketState] = useState<WebsocketState>({
    socket: undefined,
    roomId: undefined,
    gameStatus: undefined,
  });

  //  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
  //  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
  //  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝

  async function _connectSocket(token: string) {
    setSocketState((current) => ({
      ...current,
      socket: io(`${url}/?token=${token}`),
    }));
    return socketState.socket;
  }

  function _clearSocketGame() {
    setSocketState((current) => ({
      ...current,
      roomId : undefined,
      gameStatus: undefined
    }));
  }

  function _setRoomId(roomId: string | undefined) {
    setSocketState((current) => ({
      ...current,
      roomId,
    }));
  }

  function _setGameStatus(gameStatus: string | undefined) {
    setSocketState((current) => ({
      ...current,
      gameStatus,
    }));
  }

  async function _enterQueue(username: string) {
    if (socketState.socket) {
      const response = await gameService.enterQueue(socketState.socket, username);
      if (response) {
        _setRoomId(response.roomId);
        if (response.code === 'JOINED') {
          _setGameStatus(response.code);
        }
      }
    }
  }

  //  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  const _actions_ = {
    connectSocket: _connectSocket,
    enterQueue: _enterQueue,
    clearSocketGame: _clearSocketGame,
  };

  return [socketState, _actions_] as [typeof socketState, typeof _actions_];
}
