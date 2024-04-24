import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {}

const ClerkLayout: NextPage<{children: ReactNode}> = ({children}) => {
  return (
    <div className='h-full flex items-center justify-center'>
      {children}
    </div>
  )
}

export default ClerkLayout