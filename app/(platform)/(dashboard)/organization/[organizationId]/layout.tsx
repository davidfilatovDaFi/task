import { ReactNode } from "react"
import OrgControl from "./_components/org-control"


const OrganizationPageLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <OrgControl/>
      {children}
    </>
  )
}

export default OrganizationPageLayout