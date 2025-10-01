"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTodoAction = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};
export const createTodoAction = async ({ title, body}: { title: string; body?: string }) => {
  await prisma.todo.create({
    data: {
      title,
      body,
    },
  });
};
export const updateTodoAction = async () => {};
export const deleteTodoAction = async () => {};
