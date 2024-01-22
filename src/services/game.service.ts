import { Socket } from 'socket.io-client';

export const gameService = {
  enterQueue,
  answerQuestion,
};

interface Question {
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
}

interface EnterQueueResponse {
  message: string;
  code: string;
  roomId: string;
}

interface AnswerQuestionResponse {
  roundStatus: string;
  result: string;
}


async function enterQueue(socket: Socket, username: string): Promise<EnterQueueResponse> {
  return new Promise((resolve) => {
    socket.emit('enter-queue', { username }, (response: EnterQueueResponse) => {
      resolve(response);
    });
  });
}

async function answerQuestion(
  socket: Socket,
  answer: string,
  roomId: string,
  username: string,
): Promise<AnswerQuestionResponse> {
  return new Promise((resolve) => {
    socket.emit(
      'player-answer',
      roomId,
      { answer, username },
      (response: AnswerQuestionResponse) => {
        resolve(response);
      },
    );
  });
}
