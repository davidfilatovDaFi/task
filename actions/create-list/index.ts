'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateList } from "./schema"

const handler = async (data: InputType) => {
  const {userId, orgId} = auth()

  if (!userId || !orgId) return {
    error: 'Unauthorized'
  }

  const {title, boardId} = data
  let list

  try {
    const board = await db.board.findUnique({
      where: {
        orgId,
        id: boardId
      }
    })

    if (!board) return {
      error: 'Board not found'
    }

    const lastList = await db.list.findFirst({
      where: {boardId},
      orderBy: {order: 'desc'},
      select: {order: true}
    })

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: lastList ? lastList?.order + 1 : 1
      }
    })
  } catch (error) {
    return {error: 'Failed to create'}
  }

  revalidatePath(`/board/${boardId}`)
  return {data: list}
}

export const createList = createSafeAction(CreateList, handler)