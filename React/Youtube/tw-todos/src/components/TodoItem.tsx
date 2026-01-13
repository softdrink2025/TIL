import type { Todo } from "../types/todos"

interface TodoItemProps {
  todo: Todo;
  onCompletedChange: (id: number, completed: boolean) => void;
}

export default function TodoItem({todo, onCompletedChange}:TodoItemProps) {
  return (
    <div>
      <label className="flex items-center gap-2 border border-r-gray-400 rounded-m p-2 bg-white hover:bg-slate-500">
        <input
        type="checkbox"
        checked={todo.completed}
        onChange={ (e) => onCompletedChange(todo.id, e.target.checked)}
        className="scale-125"
        />
        <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.title}</span>
      </label>
    </div>
  )
}