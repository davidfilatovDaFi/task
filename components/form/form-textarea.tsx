import { KeyboardEventHandler, forwardRef } from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import FormErrors from "./form-errors";
import { useFormStatus } from "react-dom";

interface IFormTextaredProps {
  id: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  disabled?: boolean,
  errors?: Record<string, string[] | undefined>,
  className?: string,
  onBlur?: () => void,
  onClick?: () => void,
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | undefined>,
  defaultValue?: string,
}

export const FormTextare = forwardRef<HTMLTextAreaElement, IFormTextaredProps>(({
  id,
  label,
  placeholder,
  required,
  disabled,
  errors,
  className,
  onBlur,
  onKeyDown,
  onClick,
  defaultValue
}, ref) => {

  const {pending} = useFormStatus()

  return (
    <div className="w-full space-y-2">
      <div className="w-full space-y-2">
        {label && (
          <Label className="text-sm font-semibold">
            {label}
          </Label>
        )}
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          disabled={disabled || pending}
          className={cn(
            `resize-none focus-visible:outline-none shadow-sm
            focus-visible:ring-transparent focus-visible:ring-offset-0`,
            className
          )}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          defaultValue={defaultValue}
          aria-describedby={`${id}-error`}
        />
      </div>
      <FormErrors id={id} errors={errors}/>
    </div>
  )
})

FormTextare.displayName = 'FormTextare'