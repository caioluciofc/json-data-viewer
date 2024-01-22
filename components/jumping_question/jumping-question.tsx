import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { styles } from './avatar.style';

export function JumpingQuestion() {
  const { rive, RiveComponent } = useRive({
    src: '/jumping_question_mark.riv',
    autoplay: true,
    stateMachines: 'jumping',
    layout: new Layout({
      fit: Fit.ScaleDown,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div style={styles.main}>
      <RiveComponent style={styles.avatar} />
    </div>
  );
}
