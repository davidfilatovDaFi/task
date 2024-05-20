'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { DeleteList } from "./schema"

const handler = async (data: InputType) => {
  const {userId, orgId} = auth()

  if (!userId || !orgId) return {
    error: 'Unauthorized'
  }

  const {id, boardId} = data
  let list

  try {
    list = await db.list.delete({
      where: {
        boardId,
        id,
        board: {
          orgId
        }
      }
    })
  } catch (error) {
    return {error: 'Failed to delete'}
  }

  revalidatePath(`/board/${boardId}`)
  return {data: list}
}

export const deleteList = createSafeAction(DeleteList, handler)