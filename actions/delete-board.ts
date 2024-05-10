'use server'

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deleteBoard = async (id: string) => {
  await db.board.delete({
    where: {id}
  })

  revalidatePath('/organization/org_2fXhprgxNJzkSclwFzMqdSKvz8z')
  redirect('/organization/org_2fXhprgxNJzkSclwFzMqdSKvz8z')
}