import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Toaster } from 'sonner'

const PlatformLayout = ({children}: {children: ReactNode}) => {
  return (
    <ClerkProvider>
      <Toaster/>
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout