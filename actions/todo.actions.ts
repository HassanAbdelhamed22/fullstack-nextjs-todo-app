"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export const getTodoAction = async () => {
  const todos = await prisma.todo.findMany();
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
export const updateTodoAction = async () => {};
export const deleteTodoAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
};
