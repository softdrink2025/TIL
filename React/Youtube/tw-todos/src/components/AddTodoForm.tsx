import { useState } from "react"

interface AddTodoFormProps {
  onSubmit: (title: string) => void;
}

export default function AddTodoForm({onSubmit} : AddTodoFormProps) {

  const [input, setInput] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
  }

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
      value={input}
      onChange={ (e) => setInput(e.target.value) }
      placeholder="할일을 입력해주세요"
      className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 p-2 bg-slate-900 rounded-e-md text-white hover:bg-slate-800"
      >
        Add
      </button>
    </form>
  )
}