import * as React from 'react';
import './style.css';

const { useRef } = React;

import { Stopwatch, StopwatchHandle } from './Stopwatch';
export default function App() {
  const timerRef = useRef<StopwatchHandle>(null);

  return (
    <div>
      <div
        style={{
          border: '1px solid gray',
          padding: 8,
        }}
      >
        <code style={{ background: '#ccc' }}>&lt;App/&gt;</code>

        <div style={{ margin: '8px 0' }}>
          Example React component that showcases internal state, type-safe
          exposed imperative methods and outside/inside refs
        </div>

        <div style={{ margin: '8px 0' }}>
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
    </div>
  );
}
