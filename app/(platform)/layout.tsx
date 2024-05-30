import { ReactNode } from "react";
import { Toaster } from 'sonner'

const PlatformLayout = ({children}: {children: ReactNode}) => {

  return (
    <div>
      <Toaster/>
      {children}
    </div>
  )
}

export default PlatformLayout