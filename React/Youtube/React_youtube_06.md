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

```jsx
import { useRef } from 'react';
import { createRoot } from "react-dom/client";

function App() {
    const a = useRef();
    
    const focusInput = () => {
        a.current.focus();
    }

    return (
        <>
            <input type="text" ref={a} />
            <button onClick={focusInput}>Input box 에 focus 주기</button>
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
);
```
- DOM 요소에 접근하는 방법
- 평소 React는 상태(state)를 바꿔서 화면을 업데이트하는 방식을 선호합니다. 하지만 아래와 같이 DOM을 직접 건드려야만 하는 순간이 있는데, 이때 ref를 사용합니다.

    - 포커스 제어: 페이지가 열리자마자 특정 입력창에 커서를 깜빡이게 할 때

    - 스크롤 제어: 버튼을 누르면 특정 위치로 스크롤을 내릴 때

    - 직접적인 값 읽기: state를 거치지 않고 입력값이나 요소의 크기(너비, 높이)를 즉시 알아내야 할 때

    - 외부 라이브러리 연동: D3.js, Google Maps 등 DOM을 직접 다루는 라이브러리를 React 안에서 쓸 때

```jsx
import { useRef, useState, useEffect } from 'react';
import { createRoot } from "react-dom/client";

function App() {
    const [inputValue, setInputValue] = useState("");
    const a = useRef();

    useEffect(() => {
        a.current = inputValue
    }, [inputValue]);
    
    const focusInput = () => {
        a.current.focus();
    }

    return (
        <>
            <input type="text" value={inputValue} ref={a} onChange={ (e) => {setInputValue(e.target.value)} }/>
            <h2>현재 값 : {inputValue}</h2>
            <h2>직전 값 : {a.current}</h2>
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
);
```

## useReducer
- 리액트의 상태관리 훅
- useState보다 복잡한 상태 로직을 관리할 때 사용
- const[state, dispath] = useReducer(reducer, initialState);
    - state: 현재 상태 값
    - dispatch: 상태를 변경하기 위해 action을 전달하는 함수
    - reducer: 상태를 업데이트하는 로직을 담은 함수
    - initialState: 초기 상태 값
- state를 한 곳에 모다우고 체계적으로 관리

```jsx
import { useReducer, useState } from "react";
import { createRoot } from "react-dom/client";

function warehouseReducer(state, action) {
    switch(action.type) {
        case "IN":
            return { ...state, stock: state.stock + action.payload};
        case "OUT":
            return { ...state, stock: Math.max(0, state.stock - action.payload) };
        default:
            return state;
    }
}

function Warehouse() {
    const [state, dispatch] = useReducer(warehouseReducer, { stock : 0});
    const [inputValue, setInputValue] = useState(1);

    const handleChange = (e) => {
        const val = parseInt(e.target.value, 10);
        setInputValue(isNaN(val) ? 0 : val);
    }

    return (
        <div>
            <h1>창고 재고 : {state.stock}</h1>
            <p>
                <input type="number" value={inputValue} onChange={handleChange} placeholder="수량 입력"/>
            </p>
            <button onClick={ () => dispatch( {type: "IN", payload: inputValue}) }>입고</button>
            <button onClick={ () => dispatch( {type: "OUT", payload: inputValue}) }>출고</button>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<Warehouse />)
```

## useCallback
- callback 함수를 memoize(메모이즈)
- 함수 자체 (function object)를 캐싱하는 Hook
- 그걸 memoization (메모이제이션) 이라고 말함.
- 즉, 함수를 다시 만들지 않는 게 핵심
- 함수의 실행 결과를 캐싱하는 것은 => useMemo Hook

```jsx
import { useState, useCallback } from "react";
import { createRoot } from "react-dom/client";

function Counter() {
    const[count, setCount] = useState(0);

    const handleClick = useCallback(() => {
        setCount(prev => prev + 1);
    }, []);
    // 여기서 setCount(count + 1)로 해버리면 콜백 함수를 기억하기 때문에 count가 0으로 기억되고 계속 0 + 1로 계산하게 된다.
    // 따라서 이전의 값을 prev로 받아온다.

    console.log("컴포넌트 렌더링");

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleClick}>+1 증가</button>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<Counter />)
```

## useMemo
- Momoized value를 리턴
- Memoization은 값을 캐싱하는 것
- 디펜던시가 업데이트될 때만 useMemoHook 실행
- useMemo는 Memoized값 반환 vs useCallback은 Memoization 함수 반환

```jsx
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
```
- React 컴포넌트(App)는 함수입니다. 상태(state)가 변할 때마다 이 함수는 처음부터 끝까지 다시 실행(리렌더링)됩니다.
- 할 일을 추가할 때: setTodos가 호출됨 → App 함수가 다시 실행됨 → 첫 줄부터 읽어 내려오다가 expensiveCalculation(count)를 만남 → 실행!
- 카운트를 올릴 때: setCount가 호출됨 → App 함수가 다시 실행됨 → 다시 expensiveCalculation(count)를 만남 → 실행!

```jsx
const calculation = useMemo(() => expensiveCalculation(count), [count]);
```
- useMemo는 의존성 배열([count])에 넣은 값이 변하지 않으면, 이전 렌더링 때 계산해둔 결과값을 재사용함.
- count 변경 시: 재계산 필요
- todos 변경 시: 저장된 값 즉시 반환 -> 앱이 빨라짐!

## custom Hook
- 함수
- 여러 컴포넌트에서 공통으로 사용하는 상태관리나 효과 로직을 묶어 재사용할 수 있게 해주는 훅
- useXxxx useYyyy와 같은 네이밍 규칙

```jsx
import { useState, useEffect } from "react";
import { createRoot } from 'react-dom/client';

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => setData(data));
    }, []);

    return (
        <>
            {data &&
                data.map((item) => {
                    return <p key={item.id}>{item.title}</p>
                })
            }
        </>
    );
}

createRoot(document.getElementById('root')).render(<Home />);
```
- 일반 코드 작성

```js
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [url]);

    return [data];
}

export default useFetch;
```
- useFetch.js

```jsx
import { createRoot } from 'react-dom/client';
import useFetch from "./useFetch";

function Home() {

    const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

    return (
        <>
            {data &&
                data.map((item) => {
                    return <p key={item.id}>{item.title}</p>
                })
            }
        </>
    );
}

createRoot(document.getElementById('root')).render(<Home />);
```
- main.jsx
- custom Hook 사용

## Router
- React Router v6.4부터는 Data API라는 새로운 방식이 도입됨
- 라우터 설정을 자바스크립트 객체 형태로 정의
- createBrowserRouter와 RouterProvider를 사용

## createBrowserRouter
- 웹 애플리케이션의 모든 경로와 해당 경로에서 보여줄 컴포넌트를 정의하여 하나의 라우터 객체를 만드는 함수
- 작동방식
     - 경로와 컴포넌트를 담은 자바스크립트 배열을 인수로 받음
     - 브라우저의 History API를 사용하여 URL 변경을 감지하고 관리할 수 있는 라우터 인스턴스를 생성
     - 이 라우터 객체는 애플리케이션의 전체 라우팅 규칙을 담고 있는 설계도라고 생각할 수 있다

## RouterProvider
- createBrowserRouter로 만든 라우터 객체를 받아서 React 애플리케이션의 최상위에 적용시켜주는 컴포넌트
- 작동 방식
    - router라는 props로 createBrowserRouter가 반환한 라우터 객체를 전달받음
    - 이 컴포넌트가 실제로 라우팅을 활성화하고, 현재 URL에 따라 어떤 컴포넌트를 렌더링해야 할지 결정하는 역할을 함
    - 웹 사이트에 '교통 통제 시스템'을 설치하는 것이라고 보면 됨

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Home = () => <h1>🏠 홈페이지 입니다.</h1>;
const About = () => <h1>ℹ️ 소개 페이지입니다.</h1>
const NotFound = () => <h1>❌ 404: 페이지를 찾을 수 없습니다. </h1>;

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />
    },
    {
        path: "/about",
        element: <About />,
    },
]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
```