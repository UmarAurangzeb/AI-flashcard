import { Homepage } from '@/components/component/homepage'
import React from 'react'
import { auth } from "@/auth"
import Link from 'next/link';
export default async function page() {
    const session = await auth();
    console.log(session);
    if (!session) return <div className='flex flex-col w-screen h-screen bg-slate-950 items-center justify-center text-white'>
        <div className='text-3xl text-white'>Not logged in</div>
        <Link href='/signin'> <button className="bg-zinc-900 mt-4  my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2 px-4" > {"Sign In"}</button></Link>

    </div>
    return (
        <div>
            <Homepage />
        </div>
    )
}
