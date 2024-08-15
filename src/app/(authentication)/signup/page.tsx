import { Homepage } from "@/components/component/homepage";
import Signup from "@/components/component/Signup";
import Image from "next/image";
import { signIn } from "@/auth"
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function Home() {
    return (
        <>
            <Signup>
                <form
                    action={async () => {
                        "use server"
                        await signIn("github", { redirectTo: "/dashboard" })
                    }}
                    className="w-full"
                >
                    <button type="submit" className="flex bg-black py-2 mb-4 w-7/12 md:w-8/12 mx-auto hover:bg-zinc-800 12"><span><FaGithub className="mt-1 ml-1" /></span><h3 className="flex-grow">Continue with Github</h3></button>
                </form>
                <form
                    action={async () => {
                        "use server"
                        await signIn("google", { redirectTo: "/dashboard" })
                    }}
                    className="w-full"

                >
                    <button type="submit" className="flex bg-white  text-black py-1 mx-auto w-7/12 md:w-8/12 hover:bg-gray-500   "><span><FaGoogle className="mt-1 ml-1" /></span><h3 className="flex-grow">Continue with Google</h3></button>
                </form>
            </Signup>
        </>
    )
}
