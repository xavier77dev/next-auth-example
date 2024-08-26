import Link from "next/link";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <div className='bg-blue-500 p-4 flex justify-between'>
      <h1 className='text-2xl font-bold text-white'>NextAuth</h1>


      <ul className='flex gap-4 text-white gap-x-2'>
        {!session?.user ?
          <>
            <li>
              <Link href='/'>Home</Link>
            </li>

            <li>
              <Link href='/auth/register'>Register</Link>
            </li>

            <li>
              <Link href='/auth/login'>Login</Link>
            </li>
          </>
          :
          <>
            <Link href='/dashboard'>Dashboard</Link>
            <Link href='/api/auth//signout'>logout</Link>
          </>
        }
      </ul>
    </div>
  )
}

export default Navbar;
