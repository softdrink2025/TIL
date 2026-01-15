import type { Todo } from "../types/todos";

interface TodoSummaryProps {
  todos: Todo[];
  deleteAllCompleted: () => void;
}

export default function TodoSummary({
  todos,
  deleteAllCompleted
}: TodoSummaryProps) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return(
    <div>
      <p>
        {completedTodos.length} of {todos.length} 할 일을 처리했어요.
      </p>
      {completedTodos.length > 0 && (
        <button
        className="text-red-400 hover:underline text-sm font-semibold"
        onClick={deleteAllCompleted}>
          모든 한 일 삭제
        </button>
      )}
    </div>
  )

}