"use client";

import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoFormSchema, TodoFormValues } from "@/schema";
import { createTodoAction } from "@/actions/todo.actions";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import Spinner from "./ui/Spinner";
import { toast } from "sonner";

const AddTodoForm = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const defaultValues: Partial<TodoFormValues> = {
    title: "",
    body: "",
    completed: false,
  };

  const onSubmit = async (data: TodoFormValues) => {
    try {
      setLoading(true);
      await createTodoAction({
        title: data.title,
        body: data.body,
        completed: data.completed,
      });

      setOpen(false);
      form.reset();
      toast.success("Todo created successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              Fill the form below to create a new todo.
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
                        <Input placeholder="Todo title" {...field} />
                      </FormControl>
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Todo body"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-[2px] space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Completed</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" disabled={loading}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" disabled={loading}>
                    {loading ? <Spinner /> : "Save changes"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddTodoForm;
