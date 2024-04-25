import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Activity, CreditCard, Layout, Settings } from "lucide-react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

export interface IOrganization {
  id: string,
  slug: string,
  imageUrl: string,
  name: string
}

interface INavItemProps {
  isExpended: boolean,
  isActive: boolean,
  organization: IOrganization,
  onExpand: (id: string) => void
}

const NavItem = ({isActive, isExpended, organization, onExpand}: INavItemProps) => {

  const routes = [
    {
      label: 'Boards',
      icon: <Layout className="w-4 h-4"/>,
      href: `/organization/${organization.id}`
    },
    {
      label: 'Activity',
      icon: <Activity className="w-4 h-4"/>,
      href: `/organization/${organization.id}/activity`
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4"/>,
      href: `/organization/${organization.id}/settings`
    },
    {
      label: 'Billing',
      icon: <CreditCard className="w-4 h-4"/>,
      href: `/organization/${organization.id}/billing`
    },
  ]

  const pathname = usePathname()

  const router = useRouter()

  const handlerClick = (href: string) => {
    router.push(href)
  }

  return (
    <AccordionItem value={organization.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          "flex hover:bg-neutral-500/15 rounded-md p-2 hover:no-underline text-neutral-800 hover:text-neutral-800",
          {'bg-sky-500/15 text-sky-700': isActive && !isExpended}
        )}
      >
        <div className="flex gap-3 items-center">
          <div className="w-7 h-7 relative">
            <Image className="rounded-md object-cover" src={organization.imageUrl} fill alt="Organization"/>
          </div>
          <h2>{organization.name}</h2>
        </div>

      </AccordionTrigger>
      <AccordionContent>
        {routes.map(route => (
          <Button
            key={route.href}
            onClick={() => handlerClick(route.href)}
            variant={'ghost'}
            className={cn(
              "flex w-full gap-2 items-center justify-start pl-10 hover:bg-neutral-500/15", 
              {'bg-sky-500/15 text-sky-700': route.href === pathname || pathname.includes(route.label.toLocaleLowerCase()) && pathname.includes(organization.id)}
            )}>
            {route.icon}
            <span>{route.label}</span>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  )
}

NavItem.Skeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="w-10 h-10 shrink-0"/>
      <Skeleton className="w-full h-10"/>
    </div>
  )
}

export default NavItem