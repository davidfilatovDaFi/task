import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface Props {}

const Logo: NextPage<Props> = ({}) => {
  return (
    <Link href={'/'}>
      <div className='hidden sm:flex items-center gap-4'>
        <Image src={'/logo.svg'} alt='logo' width={30} height={30}/>
        <span>Taskfull</span>
      </div>
    </Link>
  )
}

export default Logo