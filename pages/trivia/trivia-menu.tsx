'use client'; // This is a client component 👈🏽

import React from 'react';
import { TitleLarge } from '@/design_system';
import { styles } from '../../design_system/styles/trivia.style';
import Link from 'next/link';
import { Avatar } from '@/components';
import { useAppContext } from '@/src/app.provider';
import TriviaAuth from './authentication';

export default function TriviaMenu() {
  const { authState, socketState } = useAppContext();

  return (
    <main style={styles.main}>
      {!authState.authToken && <TriviaAuth />}
      {authState.authToken && (
        <div style={styles.menu}>
          <div style={styles.header}>
            <TitleLarge text="Trivia" />
          </div>

          <Avatar />

          <Link
            style={styles.button}
            href={{
              pathname: '/trivia/join',
            }}>
            Play
          </Link>
          <Link
            style={styles.button}
            href={{
              pathname: '/trivia/games',
            }}>
            Ranking
          </Link>
        </div>
      )}
    </main>
  );
}
