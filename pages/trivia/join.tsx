'use client'; // This is a client component 👈🏽

import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { PrimaryButton, TextButton, TextField, TitleLarge } from '@/design_system';
import { styles } from './join.style';
import { useRouter } from 'next/router';
import { useAppContext } from '@/src/app.provider';
import { MoodFace } from '@/components';
import { JumpingQuestion } from '@/components';

export default function JoinGame() {
  const { authState, socketState, enterQueue, gameState } = useAppContext();

  useEffect(() => {
    if (!gameState.roomId) {
      enterQueue(authState.userName);
    }
  }, []);

  useEffect(() => {
    if (gameState.gameOn) {
      router.push('/trivia/game-screen');
    }
  }, [gameState.gameOn]);

  const router = useRouter();

  console.log(gameState);

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <div style={styles.header}>
          <JumpingQuestion />
          {!gameState.gameOn && <TitleLarge text="Esperando outro Player" />}
        </div>
      </div>
    </main>
  );
}
