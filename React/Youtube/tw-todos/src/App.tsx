import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TodoSummary from "./components/TodoSummary";
import useTodos from "./hooks/useTodos";

function App() {

  const {
    todos,
    setTodoCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompletedTodos,
  } = useTodos();

  return (
    <main className="py-8 h-screen space-y-5 overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">나의 일정</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoList
        todos={todos}
        onCompletedChange={setTodoCompleted}
        onDelete={deleteTodo}
        />
        <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos}/>
      </div>
    </main>
  )
}

export default App
