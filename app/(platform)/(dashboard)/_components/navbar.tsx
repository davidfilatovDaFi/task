import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="fixed w-full flex items-center justify-between shadow-md bg-white h-14 px-4">
      <div className="flex items-center gap-4">
        <Logo/>
        <Button variant={'primary'} className="hidden sm:block" size={'sm'}>Create</Button>
        <Button variant={'primary'} className="sm:hidden block" size={'sm'}>
          <Plus/>
        </Button>
      </div>
      <div className="flex gap-3">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={'/organization/:id'}
          afterSelectOrganizationUrl={'/organization/:id'}
          afterLeaveOrganizationUrl="/select-org"
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }
            }
          }}
        />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: {
                width: '30px',
                height: '30px'
              }
            }
          }}
        />
      </div>
    </nav>
  )
}

export default Navbar