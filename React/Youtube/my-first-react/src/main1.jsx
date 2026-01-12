import { useState, useMemo } from "react";
import { createRoot } from "react-dom/client";

const expensiveCalculation = (num) => {
    console.log("계산중...");
    for(let i=0; i < 300000000; i++) {
        num += 1;
    }
    return num;
}

function App() {
    const [count, setCount] = useState(0);
    const [todos, setTodos] = useState([]);
    const calculation = useMemo(() => expensiveCalculation(count), [count]);

    const increment = () => {
        setCount((c) => c + 1);
    }
    const addTodo = () => {
        setTodos((t) => [...t, "새로운 할 일"]);
    }

    return (
        <div>
            <div>
                <h2>나의 할일들 (with useMemo)</h2>
                {todos.map((todo, index) => {
                    return <p key={index}>{todo}</p>
                })}
                <button onClick={addTodo}>할일 추가</button>
            </div>
            <hr />
            <div>
                Count: {count} <button onClick={increment}>+</button>
            </div>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />)