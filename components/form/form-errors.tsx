import { XCircle } from "lucide-react";

interface IFormErrorsProps {
  id: string,
  errors?: Record<string, string[] | undefined>
}

export const FormErrors = ({id, errors}: IFormErrorsProps) => {

  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="flex gap-2 items-center"
    >
      {errors?.[id]?.map(error => (
        <div key={error} className="flex items-center gap-2 text-red-500 p-2 rounded-md bg-red-500/10 border border-red-500">
          <XCircle className="w-5 h-5"/>
          <h2 className="text-sm">{error}</h2>
        </div>
      ))}
    </div>
  )
}

export default FormErrors