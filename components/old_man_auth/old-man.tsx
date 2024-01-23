import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { styles } from './avatar.style';
import { useAppContext } from '@/src/app.provider';

export function OldMan() {
  const { oldManState } = useAppContext()

  const { rive, RiveComponent } = useRive({
    src: '/here,_take_this!.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  useEffect(() => {
    if (rive && oldManState.text.length > 0) {
      rive.setTextRunValue("MainText", oldManState.text)  
    }
  }, [rive, oldManState.text])

  return (
    <div style={styles.main}>
      <RiveComponent style={styles.avatar} />
    </div>
  );
}
