"use client";

import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";
import { Pen, TrashIcon } from "lucide-react";
import Spinner from "./ui/Spinner";
import { ITodo } from "@/types";
import { useRouter } from "next/navigation";
import { deleteTodoAction } from "@/actions/todo.actions";
import { toast } from "sonner";

const TodosTableActions = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async ({ id }: { id: string }) => {
    setLoading(true);
    await deleteTodoAction({ id });
    setLoading(false);
    router.refresh();
    toast.success("Todo deleted successfully!");
  };

  return (
    <TooltipProvider>
      <div className="flex justify-end space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" className="cursor-pointer">
              <Pen className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onDelete({ id })}
            >
              {loading ? <Spinner /> : <TrashIcon className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default TodosTableActions;
