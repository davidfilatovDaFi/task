'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CreateCard } from "./schema"

const handler = async (data: InputType) => {
  const {userId, orgId} = auth()

  if (!userId || !orgId) return {
    error: 'Unauthorized'
  }

  const {title, boardId, listId} = data

  let card

  try {
    const list = await db.list.findUnique({
      where: {
        boardId,
        id: listId
      }
    })

    if (!list) return {
      error: 'List not found'
    }

    const lastCard = await db.card.findFirst({
      where: {
        list: {
          boardId,
          id: listId
        },
        listId,
      },
      orderBy: {order: 'desc'},
      select: {order: true}
    })

    card = await db.card.create({
      data: {
        title,
        listId,
        order: lastCard ? lastCard?.order + 1 : 1
      }
    })
  } catch (error) {
    return {error: 'Failed to create'}
  }

  revalidatePath(`/board/${boardId}`)
  return {data: card}
}

export const createCard = createSafeAction(CreateCard, handler)