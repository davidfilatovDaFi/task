import { Board } from "@prisma/client"
import { BoardTitleForm } from "./board-title-form"
import { BoardOptions } from "./board-options"

interface IBoardNavbarProps {
  board: Board
}

export const BoardNavbar = ({board}: IBoardNavbarProps) => {
  return (
    <nav
      className="fixed z-50 w-full h-14 flex justify-between items-center px-6 bg-black/50 top-14 text-white"
    >
      <BoardTitleForm board={board}/>
      <BoardOptions id={board.id}/>
    </nav>
  )
}