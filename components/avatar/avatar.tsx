import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { styles } from './avatar.style';

export function Avatar() {
  const { rive, RiveComponent } = useRive({
    src: '/head.riv',
    autoplay: true,
    stateMachines: 'State Machine 1',
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });

  const [maxWidth, setMaxWidth] = useState<number>();
  const [maxHeight, setMaxHeight] = useState<number>();

  const xAxisInput = useStateMachineInput(rive, 'State Machine 1', 'xAxis', 0);
  const yAxisInput = useStateMachineInput(rive, 'State Machine 1', 'yAxis', 0);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      const bodyRect = body.getBoundingClientRect();
      setMaxWidth(bodyRect.right);
      setMaxHeight(bodyRect.bottom);
    }
  }, []);

  useEffect(() => {
    const update = (e: any) => {
      if (maxWidth && maxHeight && yAxisInput && xAxisInput) {
        xAxisInput.value = (e.x / maxWidth) * 100;
        yAxisInput.value = 100 - (e.y / maxHeight) * 100;
      }
    };
    window.addEventListener('mousemove', update);
    return () => {
      window.removeEventListener('mousemove', update);
    };
  }, [xAxisInput, yAxisInput, maxHeight, maxWidth]);

  return (
    <div style={styles.main}>
      <RiveComponent style={styles.avatar} />
    </div>
  );
}
