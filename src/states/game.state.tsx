import { useEffect, useState } from 'react';
import { authService } from '../services/authentication.service';
import { toast } from 'react-hot-toast';
import { Socket } from 'socket.io-client';
import { gameService } from '../services/game.service';

interface GetNextQuestionResponse {
  question: Question;
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
  });

  useEffect(() => {
    if (gameState.question && !gameState.gameOn) {
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
      players: undefined,
      playerAnswer: undefined,
      waitingNextQuestion: true,
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

  function _answerQuestion(socket: Socket, answer: string, username: string) {
    _setWaitingNextQuestion();
    socket.emit('player-answer', { answer, username }, (response: any) => {
      console.log(response);
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
    setCurrentQuestion: _setCurrentQuestion,
    getNextQuestion: _getNextQuestion,
  };

  return [gameState, _actions_] as [typeof gameState, typeof _actions_];
}
