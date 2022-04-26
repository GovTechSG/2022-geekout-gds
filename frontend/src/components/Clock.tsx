import React, { useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';

import CONFIG from '../config';

interface ClockProps {
  interval?: number;
};

function Clock(props: ClockProps) {
  const [time, setTime] = React.useState('');
  const [interval] = React.useState(props.interval || 1000);

  /**
   * Update the clock when this function is called
   * This callback has no dependencies: []
   */
  const updateClock = useCallback(async () => {
    try {
      const response = await axios.get(`${CONFIG.API_ENDPOINT}/demo/time`);
      setTime(response.data.time);
    } catch (error) {
      setTime(`Error connecting to backend: ${(error as AxiosError).message}`)
    }
  }, []);

  /**
   * Trigger a clock update every {interval} milliseconds.
   * When the component is 'mounted' into the application, register the update function.
   * When the component is 'dismounted' from the application, de-register it.
   * Re-register this effect if any of the dependencies in [interval, updateClock] changes.
   */
  useEffect(() => {
    updateClock();
    const tick = setInterval(() => updateClock(), interval)
    return () => { clearInterval(tick) };
  }, [interval, updateClock]);

  return (
    <div>
      <span>
        {time}
      </span>
    </div>
  );
}

export default Clock;
