import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface GetNextQuestionResponse {
  question: Question;
  players: string[];
  score: { [key: string] : number };
}

interface Question {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

export interface GameState {
  roomId?: string;
  gameStatus?: string;
  gameOn: boolean;
  players?: string[];
  playerAnswer?: string;
  question?: string;
  answers?: string[];
  isLoading: boolean;
  score? : { [key: string] : number};
  waitingNextQuestion: boolean;
  gameResult?: 'win' | 'lost' | 'draw';
}

export default function useGameState() {
  //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  const [gameState, setGameState] = useState<GameState>({
    roomId: undefined,
    gameStatus: undefined,
    gameOn: false,
    players: undefined,
    playerAnswer: undefined,
    waitingNextQuestion: true,
    isLoading: true,
    gameResult: undefined,
    score: undefined,
  });

  useEffect(() => {
    if (gameState.question && !gameState.gameOn && gameState.players) {
      if (gameState.players.length === 2) {
        const player1 : string = gameState.players[0] ?? ""
        const player2 : string = gameState.players[1] ?? ""
        const score = { ...gameState.score }
        score[player1] = 0
        score[player2] = 0
        _setGameScore(score)
      }
      _setGameOn(true);
    }
  }, [gameState.question]);

  //  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
  //  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
  //  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝

  function _clearGame() {
    setGameState((current) => ({
      ...current,
      roomId: undefined,
      gameStatus: undefined,
      gameOn: false,
      question: undefined,
      answers: undefined,
      players: undefined,
      playerAnswer: undefined,
      score: undefined,
      waitingNextQuestion: true,
      gameResult: undefined
    }));
  }

  function _setRoomId(roomId: string | undefined) {
    setGameState((current) => ({
      ...current,
      roomId,
    }));
  }

  function _setGameResult(gameResult: 'win' | 'lost' | 'draw' | undefined) {
    setGameState((current) => ({
      ...current,
      gameResult,
    }));
  }

  function _setWaitingNextQuestion() {
    setGameState((current) => ({
      ...current,
      waitingNextQuestion: !current.waitingNextQuestion,
    }));
  }

  function _setGameOn(gameOn: boolean) {
    setGameState((current) => ({
      ...current,
      gameOn,
    }));
  }

  function _setCurrentQuestion(question: Question) {
    setGameState((current) => ({
      ...current,
      question: question.question,
      answers: [question.correctAnswer, ...question.wrongAnswers],
    }));
  }

  function _setGameScore(score : { [key: string] : number}) {
    setGameState((current) => ({
      ...current,
      score : score
    }))
  }

  function _setPlayers(players : string[]) {
    setGameState((current) => ({
      ...current,
      players : players
    }))
  }

  function _answerQuestion(socket: Socket, answer: string, username: string) {
    _setWaitingNextQuestion();
    socket.emit('player-answer', { answer, username }, (response: any) => {
      _setGameScore(response.score)
      if (response.roundStatus === 'NEXTQUESTION') {
        _getNextQuestion(socket);
      } else if (response.roundStatus === 'FINISHED') {
        if (response.result === 'DRAW') {
          _setGameResult('draw');
        } else if (response.result === username) {
          _setGameResult('win');
        } else {
          _setGameResult('lost');
        }
      }
    });
  }

  function _getNextQuestion(socket: Socket) {
    socket.emit('get-question', gameState.roomId, (response: GetNextQuestionResponse) => {
      if (!gameState.players) {
        _setPlayers(response.players)
      }
      _setGameScore(response.score)
      const question = response.question;
      _setCurrentQuestion(question);
    });
    _setWaitingNextQuestion();
  }

  //  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  const _actions_ = {
    clearGame: _clearGame,
    answerQuestion: _answerQuestion,
    setGameOn: _setGameOn,
    setRoomId: _setRoomId,
    setGameResult: _setGameResult,
    setGameScore: _setGameScore,
    setPlayers: _setPlayers,
    setCurrentQuestion: _setCurrentQuestion,
    getNextQuestion: _getNextQuestion,
  };

  return [gameState, _actions_] as [typeof gameState, typeof _actions_];
}
