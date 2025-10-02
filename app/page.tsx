import { getTodoAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import { TodoTable } from "@/components/TodoTable";

export default async function Home() {
  const todos = await getTodoAction();

  return (
    <div className="container mx-auto p-4">
      <ModeToggle />

      <div className="flex justify-between items-center mb-2 mt-5">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <AddTodoForm />
      </div>

      <div className="max-w-3xl mt-4">
        <TodoTable />
      </div>
    </div>
  );
}
