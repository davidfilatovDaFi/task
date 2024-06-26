'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateListOrder } from "./schema"

const handler = async (data: InputType) => {
  const {userId, orgId} = auth()

  if (!userId || !orgId) return {
    error: 'Unauthorized'
  }

  const {items, boardId} = data
  let lists

  try {
    const transaction = items.map(list => (
      db.list.update({
        where: {
          id: list.id,
          boardId: boardId,
          board: {
            orgId
          }
        },
        data: {
          order: list.order
        }
      })
    ))

    lists = await db.$transaction(transaction)

  } catch (error) {
    return {error: 'Failed to update'}
  }

  revalidatePath(`/board/${boardId}`)
  return {data: lists}
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)