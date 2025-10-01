import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { getTodoAction } from "@/actions/todo.actions";

export default async function Home() {
  const todos = await getTodoAction();
  return (
    <div className="container mx-auto p-4">
      <ModeToggle />

      <div className="flex justify-between items-center mb-2 mt-5">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="cursor-pointer">
                <Plus />
                New Todo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Username</Label>
                  <Input
                    id="username-1"
                    name="username"
                    defaultValue="@peduarte"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      <div className="max-w-3xl mt-4">
        <ul className="mt-4 space-y-4">
          {todos.map((todo) => (
            <div key={todo.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold">{todo.title}</h2>
              <p className="mt-2">{todo.body}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
