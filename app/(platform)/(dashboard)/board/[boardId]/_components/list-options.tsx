import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface IListOprionsProps {
  addCard: () => void;
  list: List;
}

export const ListOptions = ({ addCard, list }: IListOprionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSucces: (data) => {
      toast.success(`List ${data.title} is deleted`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSucces: (data) => {
      toast.success(`List ${data.title} is copied`);
      closeRef.current?.click();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => {
    executeDelete({ id: list.id, boardId: list.boardId });
  };

  const onCopy = () => {
    executeCopy({ id: list.id, boardId: list.boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="w-auto h-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <h2 className="text-center mb-4 text-neutral-800 font-medium">
          List options
        </h2>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"ghost"}
            className="w-auto h-auto p-2 absolute right-2 top-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button variant={"ghost"} className="w-full justify-start rounded-none">
          Add card
        </Button>
        <Button 
          variant={"ghost"} 
          className="w-full justify-start rounded-none"
          onClick={onCopy}
        >
          Copy list
        </Button>
        <Separator className="w-full my-2" />
        <Button
          variant={"ghost"}
          className="w-full justify-start rounded-none"
          onClick={onDelete}
        >
          Delete list
        </Button>
      </PopoverContent>
    </Popover>
  );
};
