'use client'

import { Sheet, SheetContent } from '@/components/ui/sheet'
import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

const MobileSidebar = () => {

  const pathname = usePathname()

  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (!isMounted) return null

  return (
    <>
      <Button 
        className='flex md:hidden' 
        variant={'ghost'} 
        onClick={() => setIsOpen(true)}
        size={'icon'}
      >
        <Menu/>
      </Button>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <SheetContent side={'left'}>
          <Sidebar storageKey='t-sidebar-mobile-state'/>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar