'use client'

import { deleteBoard } from "@/actions/delete-board"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { PopoverClose } from "@radix-ui/react-popover"
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"

interface IBoardOptionsProps {
  id: string
}

export const BoardOptions = ({id}: IBoardOptionsProps) => {

  const {execute, isLoading} = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error)
    }
  })

  const onDelete = () => {
    execute({id})
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'transparent'}
          size={'sm'}
        >
          <MoreHorizontal className="w-4 h-4"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side="bottom" 
        align="start" 
        sideOffset={10}
        className="px-0 py-3"
      >
        <h2 className="text-center mb-3">Board options</h2>
        <PopoverClose asChild>
          <Button
            variant={'ghost'}
            className="wauto h-auto p-2 absolute right-2 top-2"
          >
            <X className="w-4 h-4"/>
          </Button>
        </PopoverClose>
        <Button
          disabled={isLoading}
          onClick={onDelete}
          variant={'ghost'}
          className="w-full px-2 justify-start rounded-none"
        >
          Delete board
        </Button> 
      </PopoverContent>
    </Popover>
  )
}