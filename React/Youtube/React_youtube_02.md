## 2026/01/07

## JSX
- JavaScript XML의 줄임말
- JavaScript 코드 안에서 HTML 같은 문법을 쓸 수 있게 해줌
- 브라우저가 직접 이해하는 건 아니고, React가 JS 코드로 변환해서 실행함
- JSX를 사용하면 React에서 HTML을 작성하고 추가하는 것이 쉬워진다.

## JSX 표현 예
```jsx
const myElement = <h1>5 + 5 = { 5 + 5 }</h1>;
```
- 최상위 요소는 하나만 있어야 한다.

```jsx
const myElement = <input type="text" />
```
- input 태그에서 닫아주는 표시를 꼭 써야 한다.

```jsx
const myElemet = <h1 className="aaaa">Hello World!</h1>
```
- class 이름은 class를 쓰면 javascript 예약어와 충돌이 일어나기 때문에 className을 사용한다.

## JSX 속성
```jsx
function Human() {
  const a = "title";

  const myFunc = () => {
    alert("서울에 살고 있어요.");
  }

  return (
    <p className={a} onClick={myFunc}>저는 홍길동입니다.</p>
  );
}
```
- 클래스이름에도 자바스크립트 표현식이 가능하다
- 이벤트도 자바스크립트 표현식이 가능하다.(리액트는 모든 이벤트 핸들러 속성에 카멜케이스를 적용한다)

```jsx
function Human() {

  const style1 = {
    color: "white",
    fontSize: "3rem",
    backgroundColor: "black",
    fontWeight : "700",
  }

  return (
    <span style={style1}>저는 홍길동입니다.</span>
  );
}
```
  - 스타일을 적용할 때는 카멜 케이스의 CSS 속성 이름을 가진 자바 스크립트 객체만 가능하다.

  ## if 조건문
  - 리액트는 if 명령문을 JSX 내부에서 지원하지 않음
  - JSX에서 조건문을 사용하려면 if 조건문을 JSX 외부에 두거나 대신 3항 표현식을 사용해야 함.
  
```jsx
  function Human() {
  const age = 21;
  let result = "미성년자";

  if (age >= 20) {
    result = "성인";
  }

  return (
    <p>당신은 {result} 입니다.</p>
  );
}
```
- 조건문을 JSX 외부에 두는 방식

```jsx
function Human() {
  const age = 21;

  return (
    <p>당신은 { (age) >= 20 ? "성인" : "미성년자" } 입니다.</p>
  );
}
```
- 삼항 연산자를 이용

## Component
- HTML 요소를 반환하는 함수와 같음
- 독립적인 재사용이 가능한 코드 조각
- 자바스크립트 함수와 동일한 목적을 수행하지만, 독립적으로 작동하여 HTML을 반환
- 클래스 컴포넌트와 함수 컴포넌트 두 가지 유형이 있음
- 리액트 16.8 버전 이후 Hooks가 도입되면서 클래스형 컴포넌트의 대부분 기능을 대체하게 되었다.

```jsx
import { createRoot } from 'react-dom/client';

function Flower() {
  return(
    <p>저는 꽃입니다.</p>
  )
}

createRoot(document.getElementById('root')).render(
  <Flower />
);
```
- 함수형 컴포넌트

```jsx
function Flower(props) {
  return(
    <p>저는 {props.color} 꽃입니다.</p>
  )
}

createRoot(document.getElementById('root')).render(
  <Flower color="빨강"/>
);
```
- 인자는 props로 전달이 가능하다

```jsx
function Flower(props) {
  return(
    <p>저는 {props.color} 꽃입니다.</p>
  )
}

function Garden() {
  return (
    <>
      <p>저는 정원입니다.</p>
      <Flower color="빨강"/>
      <Flower color="노랑"/>
      <Flower color="파랑"/>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <Garden />
);
```
- 컴포넌트 안에 컴포넌트를 사용할 수도 있다.

```jsx
function Flower() {
  return(
    <p>저는 꽃입니다.</p>
  )
}

export default Flower;
```
- Flower.jsx 라는 파일을 만들어서 컴포넌트로 사용 가능하다
```jsx
import Flower from './Flower.jsx';
```
- main.jsx에서는 이렇게 불러온다.

## props
- 컴포넌트에 전달되는 인수
- 컴포넌트는 인수를 Props 객체로 받는다.

```jsx
function Flower(props) {
  return (
    <p>나는 {props.color} {props.kind} 입니다.</p>
  )
}

createRoot(document.getElementById('root')).render(
  <Flower color="하얀" kind="장미꽃" />
);
```
- props는 다른 이름으로 바꿔도 된다.
- 모든 property는 props 객체 속성으로 전달이 된다.

```jsx
function Flower(props) {
  return (
    <p>꽃이 {props.amount} 송이 있습니다.</p>
  )
}

createRoot(document.getElementById('root')).render(
  <Flower amount={10} />

// 변수
function Flower(props) {
  return (
    <p>꽃이 {props.amount} 송이 있습니다.</p>
  )
}

let cnt = 20;
createRoot(document.getElementById('root')).render(
  <Flower amount={cnt} />

);

//객체
function Flower(props) {
  return (
    <>
    <p>우리 가게에는 {props.colors[0]} {props.colors[1]} {props.colors[2]} 꽃이 있습니다.</p>
    <p>현재 남은 꽃이 {props.types.kind} {props.types.amount} 송이입니다. </p>
    </>
  )
}

const a = ["빨강", "노랑", "파랑"];
const b = {kind: "장미꽃", amount: 10};
createRoot(document.getElementById('root')).render(
  <Flower colors={a} types={b} />
);

```
- 숫자, 변수는 중괄호 안에 넣어서 보내야 한다.

```jsx
function Flower(props) {
  return (
    <p>예쁜 {props.kind} 꽃이 피었습니다.</p>
  )
}

function Garden() {
  return (
    <>
      <p>이 곳은 정원입니다.</p>
      <Flower kind="장미" />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <Garden />
);
```
- 한 컴포넌트에서 다른 컴포넌트로 데이터를 전달할 수 있다.

## props 구조 분해
```jsx
function Flower({kind}) {
  return (
    <p>예쁜 {kind} 꽃이 피었습니다.</p>
  )
}

createRoot(document.getElementById('root')).render(
  <Flower kind="장미" color="빨강" amount={10} />
);
```
- kind 속성만 받기

```jsx
function Flower(props) {
  const {kind, color} = props;
  return (
    <p>예쁜 {color} {kind} 꽃이 피었습니다.</p>
  )
}

createRoot(document.getElementById('root')).render(
  <Flower kind="장미" color="빨강" amount={10} />
);
```
- 전체를 받은 후에 제한할 수도 있다.

```jsx
function Human({name, age, ...rest}) {
  return (
    <> 
      <p>제 이름은 {name} 이고요,</p>
      <p>나이는 {age}세 입니다.</p>
      <p>사는 곳은 {rest.address} 입니다.</p>
    </>
  );
}
createRoot(document.getElementById('root')).render(
  <Human name="홍길동" age={20} address="서울" />
);
```
- spread syntax도 사용 가능하다.

```jsx
function Human({name = "김아무개", age = 20}) {
  return (
    <> 
      <p>제 이름은 {name} 이고요,</p>
      <p>나이는 {age}세 입니다.</p>
    </>
  );
}
createRoot(document.getElementById('root')).render(
  <Human age={20} address="서울" />
);
```
- default 값을 지정할 수도 있다.

## props children
```jsx

function Box(props) {
  const style1 = {
    border: '2px solid blue',
    padding: '10px',
    margin: '10px'
  }
  return (
    <div style={style1}>{props.children}</div>
  );
}

export default Box;

// main.jsx
import {createRoot} from 'react-dom/client';
import Box from './Box';

function App() {
  return (
    <div>
      <Box>
        <h1>안녕하세요!</h1>
        <p>이 부분은 Box 컴포넌트 children입니다.</p>
      </Box>
      <Box>
        <button>클릭</button>
      </Box>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
);
```
- box 컴포넌트 안에 적힌 태그들이 children이 된다.


## React Event
```jsx
function App() {
  const sayHi = () => {
    alert("안녕하세요.");
  }

  return (
    <button onClick={sayHi}>인사 버튼</button>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
);
```
- 이벤트는 카멜케이스로 작성한다.

```jsx
function App() {
  const sayHi = (name) => {
    alert(`${name}님, 안녕하세요.`);
  }

  return (
    <button onClick={() => sayHi("홍길동")}>인사 버튼</button>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
);
```
- 이벤트핸들러에 인자를 전달할 때는 화살표 함수를 사용한다.
- 익명 함수도 사용할 수 있으나 this에서 차이가 나기 때문에 react는 화살표 함수를 권장한다.

```jsx
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
```
- 이벤트 핸들러는 함수를 트리거한 event에 접근할 수 있다.