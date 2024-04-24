import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClipboardCheck } from 'lucide-react';
import {Poppins} from 'next/font/google';
import Link from 'next/link';

const myFont = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function Home() {

  return (
    <main className="flex text-center px-10 min-h-screen flex-col gap-5 items-center justify-center">
      <div className='flex items-center gap-2 bg-sky-400 p-3 sm:p-5 rounded-full text-sky-900 shadow-md'>
        <ClipboardCheck className='w-7 h-7'/>
        <span className='text-[16px] sm:text-[20px] font-[700] uppercase'>best task managment</span>
      </div>
      <h1 className='text-[24px] sm:text-[36px] font-[700]'>
        Taskfull helps team move
      </h1>
      <div className='text-[24px] sm:text-[32px] font-[700] bg-gradient-to-r from-sky-500 to-pink-400 text-white p-3 rounded-xl'>
        work forward
      </div>
      <p className={cn('text-gray-400 leading-3 text-[16px] md:text-[20px] font-[500] text-center max-w-[700px]', myFont.className)}>
        Todolist is a leading task management tool that helps people see everything they have to do in one place. It functions as an online to-do-list, where users can manage tasks and projects, whether for themselves or as part of a team.
      </p>
      <Button size={'lg'} className='text-[24px]' asChild>
        <Link href={'/sign-up'}>Get start</Link>
      </Button>
    </main>
  );
}
