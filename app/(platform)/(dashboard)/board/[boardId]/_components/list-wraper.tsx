import { ReactNode, forwardRef } from "react"

export const ListWrapper = forwardRef<HTMLLIElement, {children: ReactNode}>((
  {children, ...props}, ref) => {
  return (
    <li {...props} ref={ref} className="shrink-0 h-full w-[272px] select-none">
      {children}
    </li>
  )
})