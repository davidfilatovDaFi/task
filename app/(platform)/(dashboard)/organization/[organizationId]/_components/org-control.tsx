"use client"

import { useOrganizationList } from "@clerk/nextjs"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const OrgControl = () => {

  const params = useParams<{organizationId: string}>()
  const {setActive} = useOrganizationList()

  useEffect(() => {
    if (!setActive) return

    setActive({
      organization: params.organizationId
    })
  }, [params.organizationId, setActive])

  return null
}

export default OrgControl