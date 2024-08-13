import Image from "next/image";
import { signIn } from "@/auth"
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
export default function Signup() {
    return (
        <>
            <div className="bg-cover w-screen h-screen flex justify-center items-center bg-slate-800 ">
                <div className="bg-slate-900 w-3/5 md:w-2/5 h-fit py-6 pb-20 flex flex-col items-center max-w-2xl ">
                    <h1 className="pt-14 font-semibold text-3xl font-serif">Sign Up</h1>
                    <form action="#" className="flex flex-col text-sm mt-10 md:w-2/3">
                        <label htmlFor="username" className="" >username</label>
                        <input
                            type="text" id="username"
                            className="focus:outline-none  bg-transparent border-b border-blue-300 mb-4"
                        />
                        <label htmlFor="password" className="">password</label>
                        <input type="password" id="password" className="focus:outline-none  bg-transparent border-b border-blue-300" />
                        <Link href={'/signin'} className="text-xs pt-1 text-gray-400 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full">Already have an account?</Link>
                        <button className="bg-zinc-900 mt-4  my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2">Sign Up</button>

                    </form>
                    <span className="w-full border-b-[1px] border-opacity-25 border-gray-500  my-4"></span>


                    <form
                        action={async () => {
                            "use server"
                            await signIn("github", { redirectTo: "/dashboard" })
                        }}
                        className="w-full"
                    >
                        <button type="submit" className="flex bg-black py-2 mb-4 w-7/12 md:w-6/12 mx-auto hover:bg-zinc-800 12"><span><FaGithub className="mt-1 ml-1" /></span><h3 className="flex-grow">Continue with Github</h3></button>
                    </form>
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google", { redirectTo: "/dashboard" })
                        }}
                        className="w-full"

                    >
                        <button type="submit" className="flex bg-white  text-black py-1 mx-auto w-7/12 md:w-6/12 hover:bg-gray-500   "><span><FaGoogle className="mt-1 ml-1" /></span><h3 className="flex-grow">Continue with Google</h3></button>
                    </form>
                </div>
            </div >
        </>
    );
}
