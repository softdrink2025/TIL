## 2026/01/11
## CSS 스타일링
- 인라인
- CSS 스타일시트
- CSS 모듈
  - import styles from './style1.module.css'
    - 이 css 파일에 있는 모든 클래스 정보를 styles라는 이름의 자바스크립트 객체로 가져오겠다는 선언


- 인라인 스타일에는 중괄호가 2개 들어간다(자바스크립트 표현식 + 자바스크립트 객체)

## CSS 모듈
- 클래스 이름이 기본적으로 로컬 범위로 지정되는 CSS 파일
- .module.css 확장자
- 특정 컴포넌트에 로컬로 범위가 지정된 CSS를 작성할 수 있음
  - CSS 클래스 이름 충돌을 방지하고 스타일을 더 쉽게 유지 관리할 수 있음

```css
.btn {
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
```
- Button.module.css 파일

```jsx
import { createRoot } from "react-dom/client";
import styles from './Button.module.css';

function Button() {
    return (
        <button className={styles.btn}>My button</button>
    )
}

createRoot(document.getElementById('root')).render(
    <Button />
)
```
- main.jsx 파일

```jsx
function Button() {
    return (
        <div>
            <button className={styles.btn}>My button</button>
            <button className={`${styles.btn} ${styles.primary}`}>My button</button>
            <button className={`${styles.btn} ${styles.secondary}`}>My button</button>
        </div>
    )
}
```
- 한 번에 여러개의 클래스를 지정할 때는 백틱(`)을 사용한다.

```css
.primary {
  composes: btn;
  background-color: #007bff;
  color: white;
}

.secondary {
  composes: btn;
  background-color: #6c757d;
  color: white;
}
```
- composes를 활용하여 클래스를 포함시킬 수 있다.
- 개발자 도구로 확인해 보면 btn, primary 두 개의 클래스가 나와있다.

```css
:global(.myheader) {
  padding: 10px 20px;
  font-size: 50px;
  color: white;
  background-color: dodgerblue;
}
``` 
```jsx
<h1 className="myheader">타이틀</h1>
```
- 전역적으로 사용할 수도 있다.
- 중괄호를 사용하지 않고 클래스를 지정한다.

## React Router
- 리액트 어플리케이션에 라우팅 기능을 제공하는 라이브러리
  - 단일 페이지 어플리케이션에서 여러 페이지 만듬
  - URL 매개변수 및 Query String 처리
  - 브라우저 History 및 탐색 관리
  - 중첩된 경로 레이아웃 만들기
  - 인증을 위한 보호된 경로 구현
- npm install react-router-dom

```jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function Home() {
    return (
        <h1>Home Page</h1>
    )
}

function About() {
    return <h1>About Page</h1>
}

function Contact() {
    return <h1>Contact Page</h1>
}

function App() {
    return (
        <BrowserRouter>
            {/* Navigation */}
            <nav>
                <Link to="/">홈</Link> | {" "}
                <Link to="/about">회사소개</Link> | {" "}
                <Link to="/contact">문의하기</Link> | {" "}
            </nav>
            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(
    <App />
);
```

```jsx
function About() {
    return (
        <div>
            <h1>About Page</h1>
            <nav>
                <Link to="/about/ceo">ceo</Link>
            </nav>
            <Outlet />
        </div>
    )
}

function AboutCeo() {
    return <h2>About / Ceo</h2>
}

{/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />}>
                    <Route path="ceo" element={<AboutCeo />} />
                </Route>
                <Route path="/contact" element={<Contact />} />
            </Routes>
```
- 중첩된 경로 지정 방식
- Outlet을 통해 자식 컴포넌트의 위치를 정한다.

```jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Info() {
    const { name } = useParams();
    return <h1>저는 {name} 입니다.</h1>;
}

function App() {
    return(
        <BrowserRouter>
            <nav>
                <Link to="/customer/홍길동">홍길동</Link> | {" "}
                <Link to="/customer/김철수">김철수</Link> | {" "}
                <Link to="/customer/정숙">정숙</Link> 
            </nav>
            <Routes>
                <Route path="/customer/:name" element={<Info />} />
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')).render(
    <App />
);
```
- 파라미터 전달
- useParams Hook을 사용한다.
- :name 은 URL Paratmer이다.

```jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

const navLinkStyles = ({isActive}) => ({
    color: isActive ? '#007bff' : '#333',
    textDecoration: isActive ? 'none' : 'underline',
    fontWeight: isActive? 'bold' : 'normal',
    padding: '5px 10px'
    }
) 

function Home() {
    return (
        <h1>Home Page</h1>
    )
}

function About() {
    return <h1>About Page</h1>
}

function Contact() {
    return <h1>Contact Page</h1>
}

function App() {
    return (
        <BrowserRouter>
            {/* Navigation */}
            <nav>
                <NavLink to="/" style={navLinkStyles}>홈</NavLink> | {" "}
                <NavLink to="/about" style={navLinkStyles}>회사소개</NavLink> | {" "}
                <NavLink to="/contact" style={navLinkStyles}>문의하기</NavLink>
            </nav>
            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(
    <App />
);
```
- 스타일을 지정해 줄 수도 있다.
- NavLink는 isActive를 통해 상태 감지가 가능하다.

```css
nav > a {
  color: #333;
  text-decoration: underline;
  font-weight: normal;
  padding: 5px 10px;
}

nav > a.active {
  color: #007bff;
  text-decoration: normal;
  font-weight: bold;
}
```
- CSS 파일을 만들어서 불러오는 방법도 있다.

```css
.inactive-link {
  color: #333;
  text-decoration: underline;
  font-weight: normal;
  padding: 5px 10px;
}

.active-link {
  color: #007bff;
  text-decoration: normal;
  font-weight: bold;
  padding: 5px 10px;
}
```
```jsx
<nav>
    <NavLink to="/" className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>홈</NavLink> | {" "}
    <NavLink to="/about" className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>회사소개</NavLink> | {" "}
    <NavLink to="/contact" className={({isActive}) => (isActive ? "active-link" : "inactive-link")}>문의하기</NavLink>
</nav>
```
- 클래스를 만들어서 지정해 줄 수 도 있다.

## React Transition
- 대규모 업데이트 중에도 리액트 앱의 반응성을 유지하는데 도움이 된다
- 다음과 같은 경우에 사용
  - UI를 정지시킬 수 있는 느린 작업
  - 당장 중요하지 않은 업데이트
  - 표시되는데 시간이 걸리는 검색 결과


1. 개요
- useTransition은 React 18에서 도입된 훅으로, 상태 업데이트에 우선순위를 부여하여 무거운 작업 중에도 UI의 응답성을 유지하게 해줍니다.

2. 핵심 개념: 우선순위의 분리
React는 기본적으로 모든 상태 업데이트를 '긴급(Urgent)'한 것으로 처리합니다. 하지만 useTransition을 쓰면 업데이트를 두 가지로 나눌 수 있습니다.

- Urgent Updates (긴급한 업데이트): 입력창 타이핑, 버튼 클릭 등 사용자와 직접 상호작용하여 즉각적인 반응이 필요한 작업.

- Transition Updates (전환 업데이트): 검색 결과 필터링, 대량의 데이터 렌더링 등 화면의 상태가 바뀌는 로직으로, 약간의 지연이 허용되는 작업.

3. 문법 및 사용법
```JavaScript
const [isPending, startTransition] = useTransition();
```
① startTransition(callback)
- 낮은 우선순위로 처리할 상태 업데이트 로직을 콜백 함수 안에 넣습니다.

- React는 브라우저에 더 급한 일(예: 타이핑)이 생기면 이 작업을 잠시 멈추고 급한 일을 먼저 처리한 뒤, 다시 이 작업을 수행합니다.

② isPending
- 전환 업데이트가 현재 진행 중인지 알려주는 불리언(Boolean) 값입니다.

- true: 아직 로딩 중 / false: 업데이트 완료

- 이를 활용해 사용자에게 "로딩 중..."과 같은 피드백을 줄 수 있습니다.

4. 코드 분석
```JavaScript

const handleChange = (e) => {
    // 1. 긴급한 업데이트: 사용자가 입력한 글자가 입력창에 즉시 보여야 함
    setText(e.target.value); 
    
    // 2. 전환 업데이트: 검색 결과 처리 (무거울 수 있음)
    startTransition(() => {
        setResults(e.target.value); // 백그라운드에서 처리
    });
}
```
- 사용자가 타이핑을 하면 setText가 즉시 실행되어 입력창이 버벅이지 않습니다.

- setResults는 백그라운드에서 조용히 처리되며, 그동안 isPending이 true가 되어 화면에 Loading...이 표시됩니다.

5. 왜 사용하는가? (UX 포인트)
- 화면 멈춤(Blocking) 방지: 무거운 렌더링 작업 때문에 입력창 타이핑이 끊기는 현상을 막아줍니다.

- 부드러운 상태 전환: 로딩 표시를 통해 사용자에게 앱이 멈춘 것이 아니라 "일하는 중"임을 명확히 알립니다.

- 최신 데이터 유지: 사용자가 빠르게 타이핑하면, React는 중간의 무거운 렌더링을 건너뛰고 마지막 입력값에 대한 결과만 렌더링하는 최적화를 수행합니다.

6. 주의사항
- 제어 컴포넌트의 입력값: input의 value 자체를 업데이트하는 상태에는 절대 사용하지 마세요. (입력이 매우 느려집니다.)

- 동기적 로직: startTransition 내부에는 setTimeout이나 async/await 같은 비동기 함수가 아닌, 순수하게 상태를 변경하는 동기적 로직만 넣어야 합니다.

7. 기타
- 새로운 타이핑이 발생하면 React는 하던 일(이전 검색 결과 렌더링)을 버리고, 가장 최신 글자를 기준으로 다시 렌더링을 시작합니다.

- Q: isPending은 언제 false가 되나요?
  - A: startTransition 콜백 내부의 모든 상태 업데이트가 완료되고, 그 결과가 브라우저 화면에 실제로 렌더링(DOM 반영)된 직후에 React가 자동으로 false로 변경합니다. 즉, UI 업데이트 작업의 완료가 종료 신호입니다.

## React Hook
### useState
```jsx
import { createRoot } from "react-dom/client";
import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>현재 카운트 : {count}</h1>
            <button onClick={() => setCount(count + 1)}>+ 증가</button>
            <button onClick={() => setCount(count - 1)}>- 감소</button>
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <Counter />
)
```
- 화살표 함수를 사용한다.  

### useEffect
- side effects를 수행하기 위한 훅

```jsx
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

function App() {
    const [count, setCount] = useState(0);

    const updateCounter = () => {
        setCount(count + 1);
    }

    useEffect(() => {
        console.log(`${count} useEffect Hook 실행되었음.`);
    })

    return (
        <>
            <p>{count}</p>
            <button type="button" onClick={updateCounter}>카운터 증가</button>
        </>
    )
}

createRoot(document.getElementById('root')).render(<App />);
```
- 기본적으로는 렌더링이 완료된 후마다 실행됩니다. 다만, 의존성 배열(Dependency Array)을 통해 특정 값이 변할 때만 실행되도록 제한할 수 있습니다.
  - ```jsx
      useEffect(() => {
        console.log(`${count} useEffect Hook 실행되었음.`);
    },[count]);
    ```

```jsx
import React, { useEffect } from 'react';

const Counter = (props) => {
  useEffect(() => {
    const counter = setInterval(() => {
      console.log('Counter 동작');
    }, 1000);

    return () => {
      clearInterval(counter);
      console.log('Counter 멈춤')
    }

  }, []);

  return (
    <div>
      <p>카운터 동작</p>
    </div>
  )
}

export default Counter
```
- Counter.jsx

```jsx
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
```
- main.jsx
- useEffect의 return값 - 뒷정리 함수
- 우리가 useEffect 안에 return () => { ... }를 작성하는 것은 React에게 다음과 같은 계약서를 전달하는 것과 같습니다.
  - 나(개발자): "React야, 이 컴포넌트가 화면에 나타날 때 setInterval을 시작해줘. 대신, 이 컴포넌트가 사라질 때(Unmount)는 내가 return에 적어준 이 청소 코드를 네가 대신 실행해줘."
  - React: "알았어. 메모리에 잘 저장해뒀다가, 이 컴포넌트가 파괴되기 직전에 꼭 실행해줄게!"