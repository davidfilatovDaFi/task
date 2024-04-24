import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import { NextPage } from 'next'
import Link from 'next/link'

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  return (
    <div className='fixed w-full h-14 flex items-center bg-white shadow-sm px-4'>
      <div className='w-full flex justify-between items-center md:max-w-screen-2xl mx-auto'>
        <Logo/>
        <div className='flex w-auto justify-between gap-4'>
          <Button variant={'ghost'} asChild>
            <Link href={'/sign-in'}>
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href={'/sign-up'}>
              Get start
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar