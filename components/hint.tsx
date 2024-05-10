import { ReactNode } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface IHintProps {
  children: ReactNode,
  description: string,
  side?: 'top' | 'bottom' | 'left' | 'right',
  sideOffset?: number
}

export const Hint = ({
  children,
  description,
  side='bottom',
  sideOffset=0
}: IHintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          sideOffset={sideOffset}
          className="max-w-[300px] break-words" 
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}