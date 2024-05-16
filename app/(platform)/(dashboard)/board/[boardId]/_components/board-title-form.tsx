'use client'

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface IBoardTitleFormProps {
  board: Board
}

export const BoardTitleForm = ({board}: IBoardTitleFormProps) => {

  const {execute} = useAction(updateBoard, {
    onSucces: (data) => {
      toast.success(`Board ${data.title} is updated`)
      setTitle(data.title)
      setIsEditing(false)
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(board.title)

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    })
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string
    execute({title, id: board.id})
  }

  if (isEditing) return (
    <form ref={formRef} action={onSubmit}>
      <FormInput
        ref={inputRef}
        id="title"
        onBlur={() => setIsEditing(false)}
        defaultValue={title}
        className="font-bold text-lg bg-transparent focus-visible:outline-none 
        focus-visible:ring-transparent focus-visible:ring-offset-0 
        border-none"
      />
    </form>
  )

  return (
    <Button
      className="font-bold text-lg"
      variant={'transparent'}
      onClick={enableEditing}
    >
      {title}
    </Button>
  )
};