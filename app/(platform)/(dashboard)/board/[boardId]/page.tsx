import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ListContainer } from "./_components/list-container"

const BoardIdPage = async ({params}: {params: {boardId: string}}) => {

  const {orgId} = auth()

  if (!orgId) {
    redirect('/select-org')
  }

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      }
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      order: 'asc'
    }
  })

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer lists={lists} boardId={params.boardId}/>
    </div>
  )
}

export default BoardIdPage