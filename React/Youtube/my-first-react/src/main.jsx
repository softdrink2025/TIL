import { createRoot } from "react-dom/client";
import { useState } from "react";
import Counter from './Counter';

function App() {

    const [showCounter, setShowCounter] = useState(false);

    return (
        <div>
            { showCounter && <Counter />}
            <button tyep="button" onClick={(() => setShowCounter( ! showCounter ))}>Counter 보이기/숨기기</button>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />);