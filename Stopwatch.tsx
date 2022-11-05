import * as React from 'react';
const { useState, forwardRef, useImperativeHandle, useRef, useEffect } = React;

export interface StopwatchHandle {
  start: () => void;
  stop: () => void;
  set: (n: React.SetStateAction<number>) => void;
  getRunningStatus: () => boolean;
  divRef: React.MutableRefObject<HTMLDivElement>;
}

export interface StopwatchProps {
  defaultRunningStatus?: boolean;
  onValueChange?: (n: number) => void;
  onRunningStatusChange?: (runningStatus: boolean) => boolean;
}

/** Stopwatch
 * @example
 * const stopwatchRef = useRef<StopwatchHandle>(null);
 * return <Stopwatch ref={stopwatchRef} />
 */
export const Stopwatch = forwardRef<StopwatchHandle, StopwatchProps>(
  (props, ref) => {
    const {
      defaultRunningStatus = true,
      onValueChange,
      onRunningStatusChange,
    } = props;

    const [val, setVal] = useState<number>(0);
    const [isRunning, setRunning] = useState<boolean>(defaultRunningStatus);
    const intervalId = useRef<ReturnType<typeof globalThis.setInterval>>(null);

    const divRef = useRef<HTMLDivElement>();

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

    useImperativeHandle(ref, () => {
      const handle: StopwatchHandle = {
        start() {
          setRunning(true);
        },
        stop() {
          setRunning(false);
        },
        set(newVal) {
          setVal(newVal);
        },
        getRunningStatus() {
          return isRunning;
        },
        divRef,
      };

      return handle;
    });

    return (
      <div ref={divRef}>
        <pre>Current value: {val}</pre>
        <button
          onClick={() => {
            console.log(divRef.current);
          }}
        >
          Log div from inside
        </button>
      </div>
    );
  }
);
