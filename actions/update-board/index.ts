'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { UpdateBoard } from "./schema"

const handler = async (data: InputType) => {
  const {userId, orgId} = auth()

  if (!userId || !orgId) return {
    error: 'Unauthorized'
  }

  const {title, id} = data
  let board

  try {
    board = await db.board.update({
      where: {
        orgId,
        id
      },
      data: {
        title
      }
    })
  } catch (error) {
    return {error: 'Failed to update'}
  }

  revalidatePath(`/board/${id}`)
  return {data: board}
}

export const updateBoard = createSafeAction(UpdateBoard, handler)