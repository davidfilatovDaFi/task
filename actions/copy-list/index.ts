'use server'

import { auth } from "@clerk/nextjs/server"
import { InputType } from "./types"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createSafeAction } from "@/lib/create-safe-action"
import { CopyList } from "./schema"

const handler = async (data: InputType) => {
  const {userId, orgId} = auth()

  if (!userId || !orgId) return {
    error: 'Unauthorized'
  }

  const {id, boardId} = data
  let list

  try {

    const listToCopy = await db.list.findUnique({
      where: {
        boardId,
        id,
        board: {
          orgId
        },
      },
      include: {
        cards: true
      }
    })

    if (!listToCopy) return {
      error: 'List is not found'
    }

    const lastList = await db.list.findFirst({
      where: {boardId},
      orderBy: {order: 'desc'},
      select: {order: true}
    })

    list = await db.list.create({
      data: {
        title: `${listToCopy?.title} - Copy`,
        boardId,
        order: lastList ? lastList?.order + 1 : 1,
        cards: {
          createMany: {
            data: listToCopy?.cards.map(card => ({
              title: card.title,
              description: card.description,
              order: card.order
            }))
          }
        }
      }
    })
  } catch (error) {
    return {error: 'Failed to cop'}
  }

  revalidatePath(`/board/${boardId}`)
  return {data: list}
}

export const copyList = createSafeAction(CopyList, handler)