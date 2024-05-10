'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { useOrganization } from "@clerk/nextjs"
import { CreditCard } from "lucide-react"
import Image from "next/image"

export const Info = () => {

  const {organization, isLoaded} = useOrganization()

  if (!isLoaded) return <Info.Skeleton/>

  return (
    <div className="flex gap-4 items-center">
      <div className="w-[60px] h-[60px] relative">
        <Image
          className="rounded-lg"
          fill
          src={organization?.imageUrl!}
          alt="organization"
        />
      </div>
      <div className="space-y-2">
        <h2 className="font-[700] text-xl">{organization?.name}</h2>
        <div className="flex text-xs items-center gap-2 text-neutral-500">
          <CreditCard className="w-4 h-4"/>
          <span>Free</span>
        </div>
      </div>
    </div>
  )
}

Info.Skeleton = () => {
  return (
    <div className="flex gap-4 items-center">
      <Skeleton className="w-[60px] h-[60px]"/>
      <div className="space-y-2">
        <Skeleton className="w-[150px] h-6"/>
        <div className="flex gap-2">
          <Skeleton className="w-4 h-4"/>
          <Skeleton className="w-[80px] h-4"/>
        </div>
      </div>
    </div>
  )
}
