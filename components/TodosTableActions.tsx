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
import { deleteTodoAction } from "@/actions/todo.actions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const TodosTableActions = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteTodoAction({ id });
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex justify-end space-x-2">
        {/* Edit Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" className="cursor-pointer">
              <Pen className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>

        {/* Delete with confirmation modal */}
        <Tooltip>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="destructive"
                  className="cursor-pointer"
                >
                  {loading ? <Spinner /> : <TrashIcon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  todo from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                  onClick={onDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner /> Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default TodosTableActions;
