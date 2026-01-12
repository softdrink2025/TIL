import { useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
}

function Step09() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, {id: Date.now(), text, done: false }]);
    setText("");
  };

  const toggleTodo = (id:number) => {
    setTodos(
      todos.map( (t) => (t.id === id) ? {...t, done: !t.done} : t )
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  }

  const handAddClick = (e: MouseEvent<HTMLButtonElement>) : void => {
    e.preventDefault();
    addTodo();
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={handAddClick}>추가</button>

      <ul>
        {
          todos.map( (t) => (
            <li key={t.id} onClick={ () => toggleTodo(t.id)}>
              {t.done ? <s>{t.text}</s> : t.text}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Step09;