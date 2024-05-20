import { ListWithCards } from "@/types";
import { ListWrapper } from "./list-wraper";
import { ListHeader } from "./list-header";

interface IListItemProps {
  list: ListWithCards,
  index: number
}

export const ListItem = ({list, index}: IListItemProps) => {
  return (
    <ListWrapper>
      <div
        className="bg-[#f1f2f4] rounded-md w-full shadow-md p-[6px]"
      >
        <ListHeader list={list}/>
      </div>
    </ListWrapper>
  )
}