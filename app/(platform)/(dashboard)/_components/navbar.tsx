import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"
import MobileSidebar from "./mobile-sidebar"
import { FormPopover } from "@/components/form/form-popover"

const Navbar = () => {
  return (
    <nav className="fixed z-50 w-full flex items-center justify-between shadow-md bg-white h-14 px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <MobileSidebar/>
        <div className="md:block hidden">
          <Logo/>
        </div>
        <FormPopover side="bottom" sideOffset={20} align="start">
          <Button variant={'primary'} className="hidden md:block" size={'sm'}>
            Create
          </Button>
        </FormPopover>
        <FormPopover side="bottom" sideOffset={20} align="start">
          <Button variant={'primary'} className="md:hidden flex" size={'icon'}>
            <Plus/>
          </Button>
        </FormPopover>
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
              },
              avatarBox: {
                width: '30px',
                height: '30px'
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