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
import { Input } from "@/components/ui/input";
import { getTodoAction } from "@/actions/todo.actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const todoFormSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(30, { message: "Title must be at most 30 characters." }),
  body: z
    .string()
    .max(100, { message: "Body must be at most 100 characters." })
    .optional(),
});

export default async function Home() {
  const todos = await getTodoAction();

  type TodoFormValues = z.infer<typeof todoFormSchema>;
  const defaultValues: Partial<TodoFormValues> = {
    title: "",
    body: "",
  };

  function onSubmit(data: TodoFormValues) {
    console.log(data);
  }

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

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
                <DialogTitle>Create todo</DialogTitle>
                <DialogDescription>
                  Make sure to fill in all fields before submitting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the title of your todo.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* for body */}
                    <FormField
                      control={form.control}
                      name="body"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            You can write about yourself here.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
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
