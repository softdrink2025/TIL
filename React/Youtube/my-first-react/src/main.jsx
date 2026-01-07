import { createRoot } from 'react-dom/client';

function App() {
  const sayHi = (name, e) => {
    alert(`${name}님, 안녕하세요.`);
    alert(`발생한 이벤트는 ${e.type}입니다.`);
  }

  return (
    <button onDoubleClick={(event) => sayHi("홍길동", event)}>인사 버튼</button>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
);