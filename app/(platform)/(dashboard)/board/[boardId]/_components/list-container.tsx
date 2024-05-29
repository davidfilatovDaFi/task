'use client'

import { ListWithCards } from "@/types"
import { ListForm } from "./list-form"
import { ListItem } from "./list-item"
import {DragDropContext, Droppable} from '@hello-pangea/dnd'
import { useEffect, useState } from "react"
import { useAction } from "@/hooks/use-action"
import { updateListOrder } from "@/actions/update-list-order"
import { toast } from "sonner"
import { updateCardOrder } from "@/actions/update-card-order"

interface IListContainerProps {
  lists: ListWithCards[],
  boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const ListContainer = ({lists, boardId}: IListContainerProps) => {

  const {execute: executeUpdateListOrder} = useAction(updateListOrder, {
    onSucces: () => {
      toast.success('List order is updated')
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const {execute: executeUpdateCardOrder} = useAction(updateCardOrder, {
    onSucces: () => {
      toast.success('Card order is updated')
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const [orderedLists, setOrderedLists] = useState(lists)

  const onDragEnd = (result: any) => {
    const {destination, source, type} = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    if (type === 'list') {
      const items = reorder(
        orderedLists, 
        source.index, 
        destination.index
      ).map((item, index) => ({...item, order: index}))

      setOrderedLists(items)
      executeUpdateListOrder({items, boardId})
    } else {
      const newLists = [...orderedLists]

      const sourceList = newLists.find((list) => list.id === source.droppableId)
      const destList = newLists.find((list) => list.id === destination.droppableId)

      if (!sourceList || !destList) return;

      if (!sourceList.cards) sourceList.cards = [];
      if (!destList.cards) destList.cards = [];

      if (source.droppableId === destination.droppableId) {
        const items = reorder(
          sourceList.cards, 
          source.index, 
          destination.index
        ).map((item, index) => ({...item, order: index}))

        sourceList.cards = items

        executeUpdateCardOrder({items, boardId})

        setOrderedLists(newLists)
      } else {
        const [removed] = sourceList.cards.splice(source.index, 1);
        removed.listId = destination.droppableId;
        destList.cards.splice(destination.index, 0, removed);

        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        
        executeUpdateCardOrder({items: destList.cards, boardId})

        setOrderedLists(newLists)
      }
    }
  }

  useEffect(() => {
    setOrderedLists(lists)
  }, [lists])

  console.log(orderedLists)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap gap-3">
            {orderedLists.map((list, index) => (
              <ListItem key={list.id} list={list} index={index}/>
            ))}
            {provided.placeholder}
            <ListForm/>
            <div className="flex shrink-0 w-1"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}