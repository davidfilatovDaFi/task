'use client'

import { ListWithCards } from "@/types"
import { ListForm } from "./list-form"
import { ListWrapper } from "./list-wraper"
import { ListItem } from "./list-item"

interface IListContainerProps {
  lists: ListWithCards[],
  boardId: string
}

export const ListContainer = ({lists, boardId}: IListContainerProps) => {
  return (
    <ol className="flex flex-wrap gap-3">
      {lists.map((list, index) => (
        <ListItem list={list} index={index}/>
      ))}
      <ListForm/>
      <div className="flex shrink-0 w-1"></div>
    </ol>
  )
}