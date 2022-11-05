import * as React from 'react';
import './style.css';

const { useRef } = React;

import { Stopwatch, StopwatchHandle } from './Stopwatch';
export default function App() {
  const timerRef = useRef<StopwatchHandle>(null);

  return (
    <div>
      <div>
        <p>&lt;Stopwatch/&gt;</p>
        <ul>
          <li>Internal state exposed via prop callbacks</li>
          <li>Controllable via exposed methods</li>
          <li>Exposes internal element refs</li>
        </ul>
        <button onClick={() => timerRef.current?.start()}>Start</button>
        <button onClick={() => timerRef.current?.stop()}>Stop</button>
        <button onClick={() => timerRef.current?.set(0)}>Set to 0</button>
        <button onClick={() => timerRef.current?.set((x) => x + 10)}>
          Add 10
        </button>
        <button
          onClick={() => console.log(timerRef.current?.getRunningStatus())}
        >
          Log Running State
        </button>
        <button
          onClick={() => {
            console.log(timerRef.current?.divRef.current);
          }}
        >
          Log div from outside
        </button>
      </div>

      <Stopwatch ref={timerRef} />
    </div>
  );
}
