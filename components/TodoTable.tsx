import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITodo } from "@/types";
import { Badge } from "./ui/badge";
import TodosTableActions from "./TodosTableActions";

export function TodoTable({ todos }: { todos: ITodo[] }) {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableCaption className="mb-1">A list of your recent Todos.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-6"
                >
                  No todos yet. 🎉 Add your first one!
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TableRow
                  key={todo.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{todo.id}</TableCell>
                  <TableCell>{todo.title}</TableCell>
                  <TableCell>
                    <Badge variant={todo.completed ? "success" : "destructive"}>
                      {todo.completed ? "Completed" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <TodosTableActions todo={todo} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{todos.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Mobile Table */}
      <div className="space-y-4 md:hidden">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="rounded-xl border p-4 shadow-sm bg-card"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{todo.title}</h3>
              {todo.completed ? (
                <Badge variant="default">Completed</Badge>
              ) : (
                <Badge variant="secondary">Pending</Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Task ID: {todo.id}
            </p>

            <TodosTableActions todo={todo} />
          </div>
        ))}

        <p className="text-center text-sm text-muted-foreground pt-2">
          Total: {todos.length}
        </p>
      </div>
    </div>
  );
}
