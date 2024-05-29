import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextare } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, forwardRef, useRef } from "react"
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";

interface ICardFormProps {
  listId: string,
  enableEditing: () => void,
  disabledEditing: () => void,
  isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, ICardFormProps>(({
  listId,
  enableEditing,
  disabledEditing,
  isEditing,
}, ref) => {

  const params = useParams()

  const formRef = useRef<ElementRef<'form'>>(null)

  const {execute, fieldErrors} = useAction(createCard, {
    onSucces: (data) => {
      disabledEditing()
      toast.success(`Card ${data.title} is created`)
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({title, boardId: params.boardId as string, listId})
  }

  useOnClickOutside(formRef, disabledEditing)

  if (isEditing) return (
    <form ref={formRef} action={onSubmit} className="space-y-4 m-1">
      <FormTextare
        id="title"
        placeholder="Enter title for new card..."
        ref={ref}
        errors={fieldErrors}
      />
      <div className="flex gap-3 items-center">
        <FormSubmit variant="primary">
          Create card
        </FormSubmit>
        <Button
          onClick={disabledEditing}
          variant={'ghost'}
          size={'sm'}
        >
          <X className="w-5 h-5"/>
        </Button>
      </div>
    </form>
  )

  return (
    <div>
      <Button
        onClick={enableEditing}
        variant={'ghost'}
        className="w-full p-2 justify-start gap-2 items-center text-muted-foreground"
      >
        <Plus className="w-4 h-4"/>
        Add card
      </Button>
    </div>
  )
})

CardForm.displayName = 'CardForm';