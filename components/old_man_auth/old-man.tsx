import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { styles } from './avatar.style';

export function OldMan() {
  const { rive, RiveComponent } = useRive({
    src: '/here,_take_this!.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
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
