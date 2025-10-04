"use server";

import { ITodo } from "@/types";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoAction = async () => {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
  return todos;
};
export const createTodoAction = async ({
  title,
  body,
  completed,
}: {
  title: string;
  body?: string;
  completed: boolean;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
    },
  });

  revalidatePath("/");
};
export const updateTodoAction = async (todo: ITodo) => {
  await prisma.todo.update({
    where: { id: todo.id },
    data: {
      title: todo.title,
      body: todo.body,
      completed: todo.completed,
    },
  });

  revalidatePath("/");
};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
