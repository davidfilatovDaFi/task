'use client'

import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useFormStatus } from "react-dom"
import FormErrors from "./form-errors"

interface FormInputProps {
  id: string,
  label?: string,
  type?: string,
  required?: boolean,
  placeholder?: string,
  className?: string,
  disabled?: boolean,
  errors?: Record<string, string[] | undefined>
  defaultValue?: string,
  onBlur?: () => void,
  onFocus?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({
    id,
    label,
    type,
    required,
    placeholder,
    className, 
    disabled,
    errors,
    defaultValue,
    onBlur,
    onFocus
   }, ref) => {

    const {pending} = useFormStatus()

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label && <Label htmlFor={id} className="text-xs">{label}</Label>}
          <Input
            onBlur={onBlur}
            onFocus={onFocus}
            defaultValue={defaultValue}
            type={type}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            required={required}
            className={className}
            ref={ref}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors errors={errors} id={id}/>
      </div>
    )
  }
)
FormInput.displayName = "FormInput"
 