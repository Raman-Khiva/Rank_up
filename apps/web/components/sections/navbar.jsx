import {Button} from '@/components/ui/button'
import Link from 'next/link'


export default function Page(){

  return(
    <div className="w-screen h-16 px-20 py-3 flex items-center justify-between ">
      <div>
        <h2>Rank up</h2>
      </div>
      <div className="">
        <ul className='flex items-center justify-between gap-8'>
        <li><Link href='/problems'>Problems</Link> </li>
          <li><Link href='/contests'>Contests</Link></li>
          <li><Link href='/editor'>Editor</Link></li>
          <li><Link href='/leaderboard'>Leaderboard</Link></li>
          <li><Link href='/dashboard'>Dashboard</Link></li>
        </ul>
      </div>
      <div>
        <Button>Login</Button>

      </div>
    </div>
  )
}
