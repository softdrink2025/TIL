import { useState, useRef, useEffect } from "react";
import { createRoot } from 'react-dom/client';

function App() {
    const [inputValue, setInputValue] = useState("");
    const count = useRef(0);

    useEffect(() => {
      count.current = count.current + 1;
      console.log(count.current);
        
    });

    return (
        <>
            <p>값을 입력해 보세요.</p>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <p>렌더링 횟수 : {count.current}</p>
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
)