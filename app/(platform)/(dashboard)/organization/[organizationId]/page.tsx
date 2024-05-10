import { NextPage } from 'next'
import { Info } from './_components/info'
import { Separator } from '@/components/ui/separator'
import { BoardList } from './_components/board-list'

interface Props {}

const OrganizationIdPage: NextPage<Props> = async ({}) => {
  
  return (
    <div className='w-full'>
      <Info/>
      <Separator className='my-4'/>
      <BoardList/>
    </div>
  )
}

export default OrganizationIdPage