import { useState, useEffect } from "react";

function Step08() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer)
  }, []);

  return <h3>현재 시각: {time}</h3>
}

export default Step08;