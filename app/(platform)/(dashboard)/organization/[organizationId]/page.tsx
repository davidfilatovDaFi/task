import { NextPage } from 'next'
import { Info } from './_components/info'
import { Separator } from '@/components/ui/separator'
import { BoardList } from './_components/board-list'
import { Suspense } from 'react'


const OrganizationIdPage = async () => {
  
  return (
    <div className='w-full'>
      <Info/>
      <Separator className='my-4'/>
      <Suspense fallback={<BoardList.Skeleton/>}>
        <BoardList/>
      </Suspense>
    </div>
  )
}

export default OrganizationIdPage