import { ReactNode } from "react"
import OrgControl from "./_components/org-control"
import { auth } from "@clerk/nextjs/server"
import { startCase } from "lodash"

export const generateMetadata = async () => {
  const {orgSlug} = auth();

  return {
    title: startCase(orgSlug || 'organization')
  };
};

const OrganizationPageLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
      <OrgControl/>
      {children}
    </>
  )
}

export default OrganizationPageLayout