'use client'

import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useLocalStorage } from "usehooks-ts"
import NavItem, { IOrganization } from "./nav-item"

const Sidebar = ({storageKey='t-sidebar-state'}: {storageKey?: string}) => {

  const [expanded, setExpended] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  )
  
  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg
  } = useOrganization()

  const {
    userMemberships,
    isLoaded: isLoadedOrgList
  } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  const defaultAccordionValue: string[] = Object.keys(expanded)
  .reduce((acc: string[], key) => {
    if (expanded[key]) acc.push(key)
    return acc
  }, [])

  const onExpand = (id: string) => {
    setExpended(curr => ({
      ...curr,
      [id]: !expanded[id]
    }))
  }

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) return (
    <>
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="w-1/2 h-10"/>
        <Skeleton className="w-10 h-10"/>
      </div>
      <div className="space-y-2">
        <NavItem.Skeleton/>
        <NavItem.Skeleton/>
        <NavItem.Skeleton/>
      </div>
    </>
  )

  return (
    <>
      <div className="flex justify-between items-center text-xs font-medium p-2">
        <h2 className="mr-auto">Workpress</h2>
        <Button asChild size={'icon'} variant={'ghost'}>
          <Link href={'/select-org'}>
            <Plus className="w-[18px] h-[18px]"/>
          </Link>
        </Button>
      </div>
      <Accordion 
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({organization}) => (
          <NavItem
            key={organization.id}
            isExpended={expanded[organization.id]}
            isActive={organization.id === activeOrganization?.id}
            organization={organization as IOrganization}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  )
}

export default Sidebar