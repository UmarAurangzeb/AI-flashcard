"use client"
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import Link from "next/link";
import { registerschema } from "../../types/zod/schema"

type FormFields = z.infer<typeof registerschema>


export default function Signup({
    children,
}: {
    children: React.ReactNode
}) {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormFields>(
        {
            resolver: zodResolver(registerschema)
        }
    );

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const res = await fetch("/signup/api", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        if (!res.ok) {
            console.log("res not ok");
        }
        else {
            console.log("registered successfully");
        }
    }
    return (
        <>
            <div className="bg-cover w-screen h-screen flex justify-center items-center bg-slate-800 text-white">
                <div className="bg-slate-900 w-3/5 md:w-2/5 h-fit py-6 pb-20 flex flex-col items-center max-w-2xl  border-gray-50 border-[1px] ">
                    <h1 className="pt-14 font-semibold text-3xl font-serif">Sign Up</h1>
                    <form action="#" className="flex flex-col text-sm mt-10 md:w-2/3" onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email" className="" >email</label>
                        <input
                            type="text" id="email" autoComplete="off"
                            className="focus:outline-none active:outline-none bg-transparent border-b border-blue-300"
                            {...register("email")}
                        />
                        {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
                        <label htmlFor="password" className="mt-4">password</label>
                        <input type="password" {...register("password")} id="password" className="focus:outline-none  bg-transparent border-b border-blue-300" />
                        {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
                        <Link href={'/signin'} className="text-xs pt-1 text-gray-400 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full">Already have an account?</Link>
                        <button className="bg-zinc-900 mt-4  my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2" type="submit">{isSubmitting ? "Submitting..." : "Sign Up"}</button>

                    </form>
                    <div className="my-4 flex items-center w-full">
                        <span className="flex-grow h-px bg-gray-500 opacity-25 "></span>
                        <p className="mx-4">OR</p>
                        <span className="flex-grow h-px bg-gray-500 opacity-25"></span>
                    </div>


                    {/* <span className="w-full border-b-[1px] border-opacity-25 border-gray-500  my-4"><p>OR</p><span className="w-full border-b-[1px] border-opacity-25 border-gray-500 "></span></span> */}
                    {children}
                </div>
            </div >
        </>
    );
}
