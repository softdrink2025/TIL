## 2016/01/12

## useContext
- 상태를 전역적으로 관리하는 방법 제공
- useState Hook과 함께 사용하면 깊이 중첩된 컴포넌트간 상태를 더 쉽게 공유할 수 있음
- 상태는 해당 상태에 액세스해야 하는 스택의 가장 높은 부모 컴포넌트에서 보관되어야 함

```jsx
import { useState } from "react";
import { createRoot } from "react-dom/client";

function Component1() {
    const [user, setUser] = useState("Linux");
    return (
        <>
            <h1>{`안녕 나는 ${user}!`}</h1>
            <Component2 user={user} />
        </>
    );
}

function Component2({user}) {
    return (
        <>
            <h1>Component 2</h1>
            <Component3 user={user} />
        </>
    );
}

function Component3({user}) {
    return (
        <>
            <h1>Component 3</h1>
            <h2>{`Hello ${user} again !`}</h2>
        </>
    )
}

createRoot(document.getElementById('root')).render(<Component1 />);
```
- 위와 같은 상황을 props drilling이라고 한다(1에서 3까지 전달하기 위해 중간 컴포넌트들에게 전달 전달)

```jsx
import { useState, createContext, useContext } from "react";
import { createRoot } from "react-dom/client";

const UserContext = createContext();

function Component1() {
    const [user, setUser] = useState("Linux");
    return (
        <UserContext.Provider value={user}>
            <h1>{`안녕 나는 ${user}!`}</h1>
            <Component2 />
        </UserContext.Provider>
    );
}

function Component2() {
    return (
        <>
            <h1>Component 2</h1>
            <Component3 />
        </>
    );
}

function Component3() {
    const user = useContext(UserContext)
    return (
        <>
            <h1>Component 3</h1>
            <h2>{`Hello ${user} again !`}</h2>
        </>
    )
}

createRoot(document.getElementById('root')).render(<Component1 />);
```
- useContext 사용

## useRef
- state와 같이 어떠한 값을 유지하는 변수로써 사용됨
  - state와 다르게 rendering이 발생하지 않음
- 자바스크립트의 querySelector와 같이 HTML DOM 요소에 접근하고자 할 때 사용됨
- 객체로 저장된다.
  - 선언: const a = useRef(초기값);
  - 저장은 객체로 저장됨 : {current: 초기값}
  - 따라서 다음과 같은 형태로 사용 : a.current

```jsx
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
```
- state를 사용하면 렌더링이 계속 일어나서 아무것도 입력하지 않아도 렌더링 횟수 증가가 무한 반복된다.
  - 처음에 useEffect 실행 -> count 증가 -> state 변화 -> use Effect 실행
- useRef를 사용하면 렌더링이 일어나지 않기 때문에 정확하게 렌더링 횟수를 셀 수 있다.

1. 실행 순서를 따라가 봅시다 (Timeline)
프로그램이 실행되는 찰나의 순간을 단계별로 뜯어보면 이유가 명확해집니다.

- 렌더링 시작: React가 App 함수를 실행합니다. 이때 count.current는 초기값인 0입니다.

- 화면 구성 (JSX 리턴): React는 <p>렌더링 횟수 : 0</p>이라는 결과물을 만들어 브라우저에 전달합니다. (사용자 눈에는 0이 보입니다.)

- 렌더링 완료: 브라우저가 화면을 다 그렸습니다.

- useEffect 실행: 렌더링이 다 끝난 직후에 드디어 useEffect가 호출됩니다.

- 값 업데이트: count.current = count.current + 1; 코드가 실행되어 값이 1이 됩니다.

- 콘솔 출력: console.log(1)이 찍힙니다.

2. 왜 화면은 1로 안 바뀌나요? (useRef vs useState)
- 이게 useState와 useRef의 결정적인 차이점입니다.

- useState: 값이 변하면 React에게 나 변했어! 화면 다시 그려!라고 신호를 보냅니다. (리렌더링 유발)

- useRef: 값이 아무리 변해도 React에게 아무런 신호를 보내지 않습니다.

- 따라서 useEffect 안에서 count.current를 1로 올렸지만, React는 화면을 다시 그릴 이유가 없다고 생각합니다. 그래서 화면에는 렌더링 시점의 값인 0이 그대로 남아있는 것입니다.

3. 입력창에 글자를 치면 어떻게 될까요?
- 이제 input에 글자를 한 글자 입력해 보세요. 그럼 화면의 숫자가 2로 변할 것입니다.

- 글자 입력 → setInputValue 호출 → 리렌더링 발생!

- App이 다시 실행될 때, 이미 이전 useEffect에서 올려둔 count.current 값은 1인 상태입니다.

- 화면에는 1이 그려집니다.

- 렌더링이 끝난 후 다시 useEffect가 실행되어 count.current가 2가 됩니다.

- 콘솔에는 2가 찍힙니다. (하지만 화면은 여전히 1)

- 즉, 화면에 보이는 숫자는 항상 실제 count.current 값보다 1이 적은 상태(이전 렌더링의 값)를 보여주게 됩니다.