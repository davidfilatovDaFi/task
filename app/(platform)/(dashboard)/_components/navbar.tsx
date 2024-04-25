import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"
import MobileSidebar from "./mobile-sidebar"

const Navbar = () => {
  return (
    <nav className="fixed w-full flex items-center justify-between shadow-md bg-white h-14 px-4">
      <div className="flex items-center gap-2 md:gap-4">
        <MobileSidebar/>
        <div className="md:block hidden">
          <Logo/>
        </div>
        <Button variant={'primary'} className="hidden md:block" size={'md'}>
          <Link href={'/select-org'}>
            Create
          </Link>
        </Button>
        <Button asChild variant={'primary'} className="md:hidden flex" size={'icon'}>
          <Link href={'/select-org'}>
            <Plus/>
          </Link>
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