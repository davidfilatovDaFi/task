import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { ListOptions } from "./list-options";

interface IListHeaderProps {
  list: List
}

export const ListHeader = ({list}: IListHeaderProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const {execute} = useAction(updateList, {
    onSucces: (data) => {
      toast.success(`List ${data.title} is updated`);
      setTitle(data.title)
      setIsEditing(false)
    },
    onError: (error) => {
      toast.error(error)
    }
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;

    if (title === list.title) {
      setIsEditing(false)
      return
    }

    execute({title, id: list.id as string, boardId: list.boardId as string});
  };

  return (
    <div className="w-full px-2 flex items-center justify-between font-semibold">
      {isEditing ? (
        <form ref={formRef} action={onSubmit}>
          <FormInput
            ref={inputRef}
            id="title"
            onBlur={() => setIsEditing(false)}
            placeholder="Enter list title..."
            defaultValue={title}
            className="h-7 px-0 py-0 focus-visible:outline-none 
            rounded-sm border-none w-full text-sm bg-transparent"
          />
        </form>
      ) : (
        <h2
          className="text-sm"
          role="button"
          onClick={enableEditing}
        >{title}</h2>
      )}
      <ListOptions
        addCard={() => {}}
        list={list}
      />  
    </div>
  )
}