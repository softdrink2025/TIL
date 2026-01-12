import { useState } from "react";

function Step03(){
  const [count, setCount] = useState(0);

  return (
    <div>
      <i>현재 카운트: {count}</i>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}

export default Step03;