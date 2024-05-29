import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";

interface ICardItemProps {
  card: Card,
  index: number,
}

export const CardItem = ({card, index}: ICardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          role="button"
          className="p-2 hover:border-black border-[2px] border-white 
          rounded-lg  shadow-md bg-white cursor-pointer"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  )
}