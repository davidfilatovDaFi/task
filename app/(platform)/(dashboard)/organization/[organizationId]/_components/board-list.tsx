import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { HelpCircle, User } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export const BoardList = async () => {

  const {orgId} = auth()

  if (!orgId) redirect('/select-org')

  const boards = await db.board.findMany({
    where: {orgId},
    orderBy: {
      createdAt: 'desc',
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-lg text-neutral-700">
        <User className="w-6 h-6"/>
        <h2>Your Boards</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map(board => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className="relative w-full h-full aspect-video rounded-md bg-no-repeat bg-cover 
            bg-center transition-all bg-sky-700 p-2 group"
            style={{backgroundImage: `url(${board.imageThumbUrl})`}}
          >
            <div
              className="absolute top-0 left-0 rounded-md w-full h-full bg-black/20 group-hover:bg-black/40"
            />
            <p className="text-white relative">{board.title}</p>
          </Link>
        ))}
        <FormPopover
          sideOffset={20}
        >
          <div
            role="button"
            className="relative w-full h-full bg-muted aspect-video rounded-md 
            hover:opacity-75 transition-all flex flex-col justify-center items-center gap-1"
          >
            <h2 className="text-md font-semibold">Create new board</h2>
            <span className="text-sm">5 remaining</span>
            <Hint sideOffset={40} description={`
              Free Workspaces can have onlu 5 open boards.
              For unlimited board upgrade this workspace
            `}>
              <HelpCircle className="absolute bottom-2 right-2 w-5 h-5"/>
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}