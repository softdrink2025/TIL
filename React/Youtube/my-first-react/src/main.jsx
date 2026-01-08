import { useState } from "react";
import { createRoot } from 'react-dom/client'

function App() {
  const [flower, setFlower] = useState("장미꽃");

  const handleChange = (e) => {
    setFlower(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = `당신이 고른 꽃은 ${flower} 입니다.`
    alert(result);
  }

  return ( 
    <form onSubmit={handleSubmit}>
      <label>꽃을 골라 주세요.</label>
      <br />
      <label>
        <input type="radio" name="flower" value="장미꽃" checked={flower == "장미꽃"} onChange={handleChange} /> 장미꽃
      </label>
      <label>
        <input type="radio" name="flower" value="국화" checked={flower == "국화"} onChange={handleChange} /> 국화
      </label>
      <label>
        <input type="radio" name="flower" value="코스모스" checked={flower == "코스모스"} onChange={handleChange} /> 코스모스
      </label>
      <button>Submit</button>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);