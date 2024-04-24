import { OrganizationList } from '@clerk/nextjs'
import { NextPage } from 'next'

interface Props {}

const CreateOrganizationPage: NextPage<Props> = ({}) => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl={'/organization/:id'}
      afterSelectOrganizationUrl={'/organization/:id'}
      hidePersonal
    />
  )
}

export default CreateOrganizationPage