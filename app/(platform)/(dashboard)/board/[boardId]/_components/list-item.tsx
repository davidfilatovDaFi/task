import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wraper";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { ElementRef, useRef, useState } from "react";
import { CardItem } from "./card-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface IListItemProps {
  list: ListWithCards,
  index: number
}

export const ListItem = ({list, index}: IListItemProps) => {

  const [isEditing, setIsEditing] = useState(false)

  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const enableEditing = () => {
    setIsEditing(true)
  }

  const disabledEditing = () => setIsEditing(false)

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <ListWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div
            {...provided.dragHandleProps}
            className="bg-[#f1f2f4] rounded-md w-full shadow-sm p-2"
          >
            <ListHeader list={list}/>
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol 
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={list.cards.length > 0 ? "mb-2 mt-3 space-y-2 px-1" : 'mt-[1px]'}
                >
                  {list.cards.map((card, index)=> (
                    <CardItem
                      key={card.id}
                      index={index}
                      card={card}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              ref={textareaRef}
              listId={list.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disabledEditing={disabledEditing}
            />
          </div>
      </ListWrapper>
      )}
    </Draggable>
  )
}