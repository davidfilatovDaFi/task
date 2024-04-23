import { NextPage } from 'next'
import { ReactNode } from 'react'
import Navbar from './_components/navbar'

const MarketingLayout: NextPage<{children: ReactNode}> = ({children}) => {
  return (
    <div className='h-full bg-slate-100'>
      <Navbar/>
      <>{children}</>
    </div>
  )
}

export default MarketingLayout