import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";
import { Toaster } from 'sonner'

const PlatformLayout = ({children}: {children: ReactNode}) => {

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Toaster/>
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout