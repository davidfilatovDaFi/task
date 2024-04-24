import { ReactNode } from "react"

const OrganizationLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="h-full pt-20 px-4">
      {children}
    </div>
  )
}

export default OrganizationLayout