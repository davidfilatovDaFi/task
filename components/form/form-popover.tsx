'use client'

import { ElementRef, ReactNode, useRef } from "react"
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"
import { FormPicker } from "./form-picker"
import { useAction } from "@/hooks/use-action"
import { createBoard } from "@/actions/create-board"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface IFormPopoverProps {
  children: ReactNode,
  side?: 'top' | 'bottom' | 'left' | 'right',
  align?: 'start' | 'center' | 'end',
  sideOffset?: number
}

export const FormPopover = ({
  children,
  side='right',
  align='center',
  sideOffset=0
}: IFormPopoverProps) => {

  const router = useRouter()
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSucces: (data) => {
      toast.success(`Board ${data.title} created`);
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const image = formData.get("image") as string

    execute({ title, image });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        side={side}
        sideOffset={sideOffset}
        align={align}
      >
        <h2 className="text-sm text-center mb-2">Create board</h2>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute top-2 right-2 w-auto h-auto p-2"
            variant="ghost"
          >
            <X className="w-4 h-4"/>
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker
              id="image"
              errors={fieldErrors}
            />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  )
}