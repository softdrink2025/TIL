import { useState } from "react";
import { Step06_Item } from "./Step06_Item";

function Step06() {
  const [tasks, setTasks] = useState<string[]>(["공부", "운동"]);

  return (
    <div>
      <h2>할 일 목록</h2>
      <ul>
        {
          tasks.map((t, i) => (
            <Step06_Item key={i} text={t} />
          ))
        }
      </ul>
    </div>
  )
}

export default Step06;