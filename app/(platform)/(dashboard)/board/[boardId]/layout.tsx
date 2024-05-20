import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { startCase } from "lodash"
import { notFound, redirect } from "next/navigation"
import { ReactNode } from "react"
import { BoardNavbar } from "./_components/board-navbar"

interface IBoardIdLayoutProps {
  children: ReactNode,
  params: {boardId: string}
}

export const generateMetadata = async ({params}: {params: {boardId: string}}) => {
  const {orgId} = auth()

  if (!orgId) return {title: 'Board'}

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  })

  return {
    title: startCase(board?.title || 'Board')
  };
};

const BoardIdLayout = async ({children, params}: IBoardIdLayoutProps) => {

  const {orgId} = auth()

  if (!orgId) redirect('/select-org')

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId
    }
  })

  if (!board) notFound()

  return (
    <div 
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{backgroundImage: `url(${board?.imageFullUrl})`}}
    >
      <div className="absolute bg-black/20 inset-0"/>
      <BoardNavbar board={board}/>
      <main className="pt-28 h-full relative">
        {children}
      </main>
    </div>
  )
}

export default BoardIdLayout