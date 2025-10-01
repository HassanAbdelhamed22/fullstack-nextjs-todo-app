import AddTodoForm from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  // const todos = await getTodoAction();

  return (
    <div className="container mx-auto p-4">
      <ModeToggle />

      <div className="flex justify-between items-center mb-2 mt-5">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <AddTodoForm />
      </div>

      {/* <div className="max-w-3xl mt-4">
        <ul className="mt-4 space-y-4">
          {todos.map((todo) => (
            <div key={todo.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold">{todo.title}</h2>
              <p className="mt-2">{todo.body}</p>
            </div>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
