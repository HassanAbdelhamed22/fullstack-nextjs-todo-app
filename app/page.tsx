import { getTodoAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import { TodoTable } from "@/components/TodoTable";
import { Toaster } from "@/components/ui/sonner";

export default async function Home() {
  const todos = await getTodoAction();

  return (
    <div>
      <Toaster position="top-right" richColors />

      {/* Add Form */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage your tasks</h2>
        <AddTodoForm />
      </div>

      {/* Todo Section */}
      <div className="rounded-xl border shadow-sm overflow-hidden">
        <TodoTable todos={todos} />
      </div>
    </div>
  );
}
