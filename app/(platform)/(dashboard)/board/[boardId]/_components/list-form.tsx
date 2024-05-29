import { ElementRef, useRef, useState } from "react";
import { ListWrapper } from "./list-wraper";
import { Plus, X } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useOnClickOutside } from "usehooks-ts";

export const ListForm = () => {

  const params = useParams()
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute, fieldErrors } = useAction(createList, {
    onSucces: (data) => {
      toast.success(`List ${data.title} created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => setIsEditing(false)

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({title, boardId: params.boardId as string})
  };

  useOnClickOutside(formRef, disableEditing)

  if (isEditing)
    return (
      <ListWrapper>
        <form 
          ref={formRef} 
          action={onSubmit}
          className="bg-white w-full space-y-3 shadow-md p-3 rounded-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            placeholder="Enter list title..."
            className="font-medium focus-visible:outline-none 
            focus-visible:ring-transparent focus-visible:ring-offset-0 
            border-none w-full text-sm"
          />
          <div className="flex items-center gap-2">
            <FormSubmit variant="primary">
              Create List
            </FormSubmit>
            <Button
              variant={'ghost'}
              onClick={disableEditing}
            >
              <X className="w-5 h-5"/>
            </Button>
          </div>
        </form>
      </ListWrapper>
    );

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="bg-white/85 rounded-md w-full p-3 shadow-md flex 
        items-center gap-2 hover:bg-white/60 font-medium text-sm"
      >
        <Plus className="w-4 h-4" />
        Add list
      </button>
    </ListWrapper>
  );
};
