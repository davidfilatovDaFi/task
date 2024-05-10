'use client'

import { ReactNode } from "react"
import { Button } from "../ui/button"
import { useFormStatus } from "react-dom"

interface IFormSubmitProps {
  children: ReactNode,
  disabled?: boolean,
  className?: string,
  variant?: 'default' | 'destructive' | 'outline' | 'ghost' | 'link' | 'primary' | 'secondary'
}

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant
}: IFormSubmitProps) => {

  const {pending} = useFormStatus()

  return (
    <Button
      type="submit"
      className={className}
      disabled={pending || disabled}
      variant={variant}
    >
      {children}
    </Button>
  )
}