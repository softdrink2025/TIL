import React, { useEffect } from 'react';

const Counter = (props) => {
  useEffect(() => {
    const counter = setInterval(() => {
      console.log('Counter 동작');
    }, 1000);

    return () => {
      clearInterval(counter);
      console.log('Counter 멈춤')
    }

  }, []);

  return (
    <div>
      <p>카운터 동작</p>
    </div>
  )
}

export default Counter