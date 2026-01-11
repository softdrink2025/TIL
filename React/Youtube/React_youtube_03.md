## 2026/01/08

## 조건문
```jsx
function AdminPanel() {
  return (
    <p>관리자 전용 페이지입니다.</p>
  );
}

function UserPanel() {
  return (
    <p>일반 사용자 페이지입니다.</p>
  );
}

function App() {
  const isAdmin = false;

  if(isAdmin) {
    return <AdminPanel />;
  } else{
    return <UserPanel />;
  }
}

createRoot(document.getElementById('root')).render(
  <App />
);
```
- isAdmin의 불리언(Boolean) 값에 따라 App 컴포넌트가 어떤 하위 컴포넌트를 렌더링할지 결정한다.
- true일 경우 AdminPanel을, false일 경우 UserPanel을 반환하도록 되어 있다.

```jsx
function AdminPanel() {
  return (
    <p>관리자 전용 페이지입니다.</p>
  );
}

function UserPanel() {
  return (
    <p>일반 사용자 페이지입니다.</p>
  );
}

function App(isAdmin) {
  if(isAdmin) {
    return <AdminPanel />;
  } else{
    return <UserPanel />;
  }
}

createRoot(document.getElementById('root')).render(
  <App isAdmin={true}/>
);
```
- props를 사용하는 구조로 변경 가능하다.

```jsx
function App(isAdmin) {

  let content = '';
  if(isAdmin) {
    content =  <AdminPanel />;
  } else{
    content = <UserPanel />;
  }

  return (
    <>
      <h1>어서오세요.</h1>
      {content}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <App isAdmin={true}/>
);
```

```jsx
function App(props) {

  return (
    <>
      {props.kind && <p>나는 {props.kind} 꽃입니다.</p>}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <App kind="장미"/>
);
```
- 선택적으로 렌더링
- kind 값을 할당해주지 않으면 아무것도 출력되지 않는다.

```jsx
function App({isAdmin}) {
  return (
    <>
      { isAdmin ? <AdminPanel /> : <UserPanel /> }
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <App isAdmin={false} />
);
```
- 삼항 연산자를 이용하여 조건부로 렌더링

## 목록
- 리액트에서는 loop를 사용하여 목록을 표현한다.
- javascript의 map 메서드를 주로 활용한다.

```jsx
function Flowers() {
  const flowers = ['장미', '매화', '국화', '수선화'];

  return (
    <>
      <ul>
        {flowers.map( (flower) => <li>나는 {flower} 입니다.</li> )}
      </ul>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <Flowers />
);
```

```jsx
function Flowers() {
  const flowers = [
    {id: 1, kind: '장미'}, 
    {id: 2, kind: '매화'}, 
    {id: 3, kind: '철쭉'}, 
  ];

  return (
    <>
      <ul>
        {flowers.map( (flower) => <li key={flower.id}>나는 {flower} 입니다.</li> )}
      </ul>
    </>
  );
}
```
- 키를 사용하면 react가 element를 수정할 수 있다.

```jsx
function Flowers() {
  const flowers = ['장미', '매화', '국화'];

  return (
    <>
      <ul>
        {flowers.map( (flower, index) => <li key={index}>나는 {flower} 입니다.</li> )}
      </ul>
    </>
  );
}
```
- 고유한 값이 없다면 배열 인덱스를 사용할 수도 있다.
  - 변하지 않는 목록인 경우
  - 재정렬되거나 필터링 되지 않는 경우
  - 목록에 식별할 수 없는 항목이 없는 경우

## Form
- React에서는 일부 폼 요소가 html과 다르게 동작한다.
- Controlled Component
  - 컴포넌트 state를 통해서 Form 데이터를 관리하는 방법을 제공하는데 이러한 컴포넌트를 말함.
- Hook을 사용한다.

```jsx
import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function App() {

  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  return (
    <form>
      <label>이름 입력 : </label>
      <input
      type="text"
      value={name}
      onChange={handleChange}
      />
      <p>입력한 값 : {name}</p>
    </form>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
)
```
- useState는 배열을 반환하기 때문에 {}로 받는게 아니라 []로 받는다.
- useState("홍길동")과 같이 초기값을 줄 수도 있다.

```jsx
  function handleSubmit(e) {
    e.preventDefault();
    alert(name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>이름 입력 : </label>
      <input
        type="text"
        value={name}
        onChange={handleChange}
      />
      <input type="submit" />
    </form>
  );
```
- 폼 제출을 위한 submit

```jsx
function App() {

  const [myText, setMyText] = useState("");

  function handleChange(e) {
    setMyText(e.target.value);
  }

  return (
    <form >
      <label>값을 입력 : </label>
      <textarea
        value={myText}
        onChange={handleChange}
      />
      <p>입력 텍스트 : {myText}</p>
    </form>
  );
}
```
- react에서는 textarea의 내용을 value 속성을 활용해서 할당한다.

```jsx
function App() {

  const [myFlower, setMyFlower] = useState("무궁화꽃");

  const handleChange = ( e ) => {
    setMyFlower(e.target.value);
    alert(e.target.value);
  }

  return (
    <form >
      <select value={myFlower} onChange={handleChange}>
        <option value="장미꽃">장미꽃</option>
        <option value="국화">국화</option>
        <option value="민들레">민들레</option>
      </select>
    </form>
  );
}
```
- html에서는 selected를 사용했는데 react에서는 value에 지정을 해준다.

## Form 다중 입력
- 구문을 두 개를 만들어서 각각 관리하거나
- 객체로 초기화해서 한 번에 관리한다.
```jsx
function App() {
  const [flower, setFlower] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFlower( values => ( {...values, [name]: value} ));
  }

  return (
    <form>
      Color : <input
        type="text"
        name="color"
        value={flower.color}
        onChange={handleChange}
      />
      Kind : <input
        type="text"
        name="kind"
        value={flower.kind}
        onChange={handleChange}
      />
      <p>{flower.color} {flower.kind}</p>
    </form>
  )
}
```
- setFlower 함수에서 대괄호 []를 사용하는 이유는 대괄호를 빼버리면 name이라는 키에 값을 할당하게 된다.
- setFlower 함수에서의 values는 현재 변경되기 직전의 flower 객체 상태를 의미한다.

## Form - checkbox
```jsx
function App() {
  const [flower, setFlower] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFlower( values => ( {...values, [name]: value} ));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let options = "";
    let result = "";
    if (flower.wrap) options += ' 선물 포장 해주세요.';
    if (flower.home) options += ' 배달 해주세요.';
    result = `${flower.color} ${flower.kind} 을`;
    if (options) {
      result += ` 옵션사항 : ` + options;
    }
    alert(result);

  }

  return (
    <form onSubmit={handleSubmit}>
      Color : <input
        type="text"
        name="color"
        value={flower.color}
        onChange={handleChange}
      />
      Kind : <input
        type="text"
        name="kind"
        value={flower.kind}
        onChange={handleChange}
      />
      <br />
      <label>선물 포장 희망
        <input type="checkbox"
          name="wrap"
          checked={flower.wrap}
          onChange={handleChange}
        />
      </label>
      <label>배달 희망
        <input type="checkbox"
          name="home"
          checked={flower.home}
          onChange={handleChange}
        />
      </label>
      <button>Submit</button>
      <p>{flower.color} {flower.kind}</p>
    </form>
  )
}
```

## form - radio
```jsx
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
  ```