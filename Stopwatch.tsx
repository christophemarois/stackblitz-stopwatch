import * as React from 'react';
const { useState, forwardRef, useImperativeHandle, useRef, useEffect } = React;

export interface StopwatchHandle {
  start: () => void;
  stop: () => void;
  set: (n: React.SetStateAction<number>) => void;
  getRunningStatus: () => boolean;
  divRef: React.RefObject<HTMLDivElement>;
}

export interface StopwatchProps {
  defaultRunningStatus?: boolean;
  onValueChange?: (n: number) => void;
  onRunningStatusChange?: (runningStatus: boolean) => boolean;
}

type Interval = ReturnType<typeof globalThis.setInterval>;

/** Stopwatch: example React component that showcases internal state,
 * type-safe exposed imperative methods and outside/inside refs
 *
 * @example
 * // call methods with, e.g., stopwatchRef.current?.set(0)
 * const stopwatchRef = useRef<StopwatchHandle>(null);
 *
 * return <Stopwatch ref={stopwatchRef} />
 */
export const Stopwatch = forwardRef<StopwatchHandle, StopwatchProps>(
  (props, forwardedRef) => {
    const {
      defaultRunningStatus = true,
      onValueChange,
      onRunningStatusChange,
    } = props;

    const [val, setVal] = useState<number>(0);
    const [isRunning, setRunning] = useState<boolean>(defaultRunningStatus);
    const intervalId = useRef<Interval>(-1);

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isRunning) {
        intervalId.current = globalThis.setInterval(() => {
          setVal((val) => val + 1);
        }, 1000);
      } else {
        globalThis.clearInterval(intervalId.current);
      }

      onRunningStatusChange?.(isRunning);

      return () => globalThis.clearInterval(intervalId.current);
    }, [isRunning]);

    useEffect(() => {
      onValueChange?.(val);
    }, [val]);

    // Keep handle in a ref so we can use it from the inside,
    // but it doesn't get recreated on every render.
    const handleRef = useRef<StopwatchHandle>({
      start() {
        setRunning(true);
      },
      stop() {
        setRunning(false);
      },
      set: setVal,
      getRunningStatus() {
        return isRunning;
      },
      divRef,
    });

    // Expose the handle to the forwardedRef
    useImperativeHandle(forwardedRef, () => handleRef.current);

    return (
      <div
        ref={divRef}
        style={{
          background: 'whitesmoke',
          border: '1px solid gray',
          padding: 8,
        }}
      >
        <pre style={{ marginTop: 0 }}>
          Current value: {val}. Status: {isRunning ? 'running' : 'not running'}
        </pre>

        <button onClick={() => handleRef.current.set((x) => x + 10)}>
          Add 10 from inside
        </button>
      </div>
    );
  }
);
