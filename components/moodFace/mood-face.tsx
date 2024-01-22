import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { styles } from './avatar.style';

interface Props {
  gameResult: 'win' | 'draw' | 'lost';
}

export function MoodFace({ gameResult }: Props) {
  const result_animations = {
    win: 'normal_to_happy',
    draw: 'idle_normal',
    lost: 'normal_to_sad',
  };
  const { rive, RiveComponent } = useRive({
    src: '/mood_face.riv',
    autoplay: true,
    stateMachines: result_animations[gameResult],
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div style={styles.main}>
      <RiveComponent style={styles.avatar} />
    </div>
  );
}
