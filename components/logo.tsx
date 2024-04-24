import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props {}

const Logo: NextPage<Props> = ({}) => {
  return (
    <Link href={'/'}>
      <div className='flex items-center gap-4'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30}/>
        <span className='hidden sm:block'>Taskfull</span>
      </div>
    </Link>
  )
}

export default Logo