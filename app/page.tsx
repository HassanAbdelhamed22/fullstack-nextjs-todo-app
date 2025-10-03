import { getTodoAction } from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import { ModeToggle } from "@/components/ModeToggle";
import { TodoTable } from "@/components/TodoTable";
import { Toaster } from "@/components/ui/sonner";

export default async function Home() {
  const todos = await getTodoAction();

  return (
    <div className="container max-w-6xl mx-auto p-4">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <div className="flex justify-between items-center py-3 border-b mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Todo List</h1>
        <ModeToggle />
      </div>

      {/* Add Form */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage your tasks</h2>
        <AddTodoForm />
      </div>

      {/* Todo Section */}
      {todos.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <p className="text-lg mb-2">No todos yet 🎉</p>
          <AddTodoForm />
        </div>
      ) : (
        <div className="rounded-xl border shadow-sm overflow-hidden">
          <TodoTable todos={todos} />
        </div>
      )}
    </div>
  );
}
