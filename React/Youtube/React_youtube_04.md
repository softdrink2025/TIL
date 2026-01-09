## 2026/01/09
## React Portal
- 컴포넌트를 DOM Tree의 다른 위치에 렌더링할 수 있게 하는 기능
- 포탈의 특징 (중요!)
    - DOM 위치만 바뀔 뿐, React의 기능은 그대로! 물리적인 위치는 이동했지만, React 상에서는 여전히 부모 컴포넌트 아래에 있습니다. 
    - 부모가 준 Props를 그대로 받을 수 있습니다.
    - 모달 안에서 버튼을 누르면 부모의 State를 바꿀 수 있습니다.
    - 이벤트 버블링이 유지됩니다. (모달 안에서 클릭 이벤트가 발생하면, DOM 위치와 상관없이 React 트리상의 부모 컴포넌트가 그 이벤트를 감지할 수 있습니다.)
    - 시각적 해방 - 부모의 overflow: hidden이나 z-index 감옥에서 탈출하여 화면 전체를 자유롭게 사용할 수 있게 됩니다.

```jsx
import { createPortal } from 'react-dom';

function Modal( {children} ) {

    const style1 = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const style2 = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px'
    };

    return createPortal(
        <div style={style1}>
            <div style={style2}>{children}</div>
        </div>,
        document.body
    );
}

export default Modal;
```
- Modal.jsx 파일을 만들어서 설정
- props의 children을 가져와서 사용함
   - children은 "해당 컴포넌트의 태그 사이에 넣은 모든 내용물"을 의미
   - 컴포넌트 재사용성: 이렇게 만들어두면 어떤 페이지에서는 로그인 폼을 담은 모달로, 다른 페이지에서는 단순 경고창 모달로 내용물만 바꿔가며 재사용할 수 있습니다. Modal 컴포넌트는 내용물이 무엇인지 몰라도 되고, 그저 모달의 틀(배경색, 위치 등)만 관리하면 됩니다.

```jsx
import { useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "./Modal";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>React Portal Example</h1>
      <button onClick={ () => setOpen(true) }>Open Modal</button>
    
      { open && (
        <Modal>
          <h2>안녕하세요!</h2>
          <button onClick = { () => setOpen(false)}>닫기</button>
        </Modal>
        )
      }
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
```
- main.jsx 파일

## Suspense
- 코드나 데이터가 로드될 때까지 대체 HTML을 표시하는 기능
```jsx
function Greeting() {
    return <h1>안녕하세요!</h1>
}

export default Greeting;
```
- Greeing.jsx

```jsx
import { createRoot } from 'react-dom/client';
import React, { Suspense } from 'react';
// import Greeting from "./Greeting";

// const LazyGreeting = React.lazy(() => import('./Greeting'));
const LazyGreeting = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import('./Greeting')), 2000);
  })
)

function App() {
    return(
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyGreeting />
            </Suspense>
        </div>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
);
```
- main.jsx
- Suspense의 핵심 역할: "기다림의 선언"
    - 일반적으로 컴포넌트는 호출되면 즉시 화면을 그려야 합니다. 하지만 LazyGreeting처럼 아직 준비되지 않은 컴포넌트가 있을 때, React는 에러를 내뱉는 대신 Suspense를 찾아 올라갑니다.
    - Suspense: "내 자식 중에 아직 로딩 중인 컴포넌트가 있어? 그럼 내가 대신 fallback UI를 보여주고 있을게!"라고 선언하는 보호막 역할을 합니다.
    - fallback: 데이터나 컴포넌트 파일이 도착하기 전까지 사용자에게 보여줄 '임시 화면'(스피너, 로딩 메시지 등)입니다.
- 코드가 실행되면 브라우저에서는 다음과 같은 일이 벌어집니다.
    - 시작: App이 실행되지만 LazyGreeting은 아직 파일이 없습니다.
    - 정지 (Suspend): LazyGreeting이 "나 아직 준비 안 됐어!"라고 신호를 보냅니다.
    - 대체: 가장 가까운 부모인 Suspense가 fallback인 <div>Loading...</div>를 화면에 띄웁니다.
    - 2초 경과: setTimeout이 끝나고 Greeting 파일이 도착(resolve)합니다.
    - 재개 (Resume): React가 다시 LazyGreeting을 그려서 화면에 "안녕하세요(Greeting 내용)"가 나타납니다.