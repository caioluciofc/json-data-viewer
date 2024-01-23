'use client'; // This is a client component 👈🏽

import React, { useEffect } from 'react';
import { Colors, IconCrossMark, PrimaryButton, TitleLarge } from '@/design_system';
import { styles } from '../../design_system/styles/_game-screen.style';
import { useRouter } from 'next/router';
import { useAppContext } from '@/src/app.provider';
import { MoodFace } from '@/components';
import { ScoreBoard } from '@/components';

export default function TriviaGame() {
  const router = useRouter();
  const { gameState, socketState, answerQuestion, authState, clearGame, clearSocketGame } = useAppContext();

  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function _answerQuestion(answer: string) {
    if (socketState.socket) {
      answerQuestion(socketState.socket, answer, authState.userName ?? '');
    }
  }

  useEffect(() => {
    if (gameState.gameResult) {
      setTimeout(() => {
        clearGame();
        clearSocketGame();
        router.push('/trivia/trivia-menu');
      }, 3000);
    }
  }, [gameState.gameResult]);

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <div style={styles.menu}>
          {gameState.gameResult && <MoodFace gameResult={gameState.gameResult} />}

          {gameState.waitingNextQuestion && !gameState.gameResult && (
            <TitleLarge text="Waiting for the other player(s)" color={Colors.background} />
          )}

          {!gameState.waitingNextQuestion && !gameState.gameResult && (
            <>
              <div
                style={styles.close}
                onClick={() => {
                  router.replace('/trivia');
                }}>
                <IconCrossMark />
              </div>
              <div style={styles.header}>
                <TitleLarge text={gameState.question ?? ''} color={Colors.background} />
              </div>
              {gameState.answers &&
                shuffleArray(gameState.answers).map((answer) => {
                  return (
                    <PrimaryButton
                      text={answer}
                      key={answer}
                      isLoading={false}
                      onClick={() => _answerQuestion(answer)}
                    />
                  );
                })}
            </>
          )}
        </div>
        <div>
          <ScoreBoard />
        </div>
      </div>
    </main>
  );
}
