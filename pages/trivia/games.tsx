import React from 'react';
import { ArrowRight, Colors, TextButton, TitleLarge } from '@/design_system';
import { styles } from '../../design_system/styles/games.style';
import { useRouter } from 'next/router';

export default function Games() {
  const router = useRouter();

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <div style={styles.header}>
          <TitleLarge text="Find a match" />
        </div>
        <div
          style={styles.button}
          onClick={() => {
            console.log('start game');
          }}>
          Player #1
          <ArrowRight color={Colors.white} />
        </div>
        <div
          style={styles.button}
          onClick={() => {
            console.log('start game');
          }}>
          Player #2
          <ArrowRight color={Colors.white} />
        </div>
        <div
          style={styles.button}
          onClick={() => {
            console.log('start game');
          }}>
          Player #3
          <ArrowRight color={Colors.white} />
        </div>
        <div
          style={styles.button}
          onClick={() => {
            console.log('start game');
          }}>
          Player #4
          <ArrowRight color={Colors.white} />
        </div>
        <div
          style={styles.button}
          onClick={() => {
            console.log('start game');
          }}>
          Player #4
          <ArrowRight color={Colors.white} />
        </div>

        <TextButton
          text="Back"
          onClick={() => {
            router.replace('/trivia');
          }}
          isLoading={false}
        />
      </div>
    </main>
  );
}
