import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { styles } from './avatar.style';
import { useAppContext } from '@/src/app.provider';

export function ScoreBoard() {
  const { gameState } = useAppContext()

  const { rive, RiveComponent } = useRive({
    src: '/score_board.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  if (gameState.players && rive) {
    rive.setTextRunValue('Player1', gameState.players[0])
    rive.setTextRunValue('Player2', gameState.players[1])
    rive.setTextRunValue('Player1Score', "0")
    rive.setTextRunValue('Player2Score', "0")
  }

  useEffect(() => {
    if (rive && gameState.players && typeof gameState.score !== 'undefined') {
      if (gameState.players) {
        rive.setTextRunValue('Player1', gameState.players[0])
        rive.setTextRunValue('Player2', gameState.players[1])
      }
      const player1 = rive.getTextRunValue('Player1') ?? ""
      const player2 = rive.getTextRunValue('Player2') ?? ""
      console.log(player1, player2)
      console.log(gameState.score)
      rive.setTextRunValue('Player1Score', gameState.score[player1].toString())
      rive.setTextRunValue('Player2Score', gameState.score[player2].toString())
    }
  }, [gameState])

  return (
    <div style={styles.main}>
      <RiveComponent style={styles.avatar} />
    </div>
  );
}
