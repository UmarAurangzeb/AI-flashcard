import Link from "next/link";
import React from "react";
export default function Signin() {
  return (
    <>
      <div className="bg-cover w-screen h-screen flex justify-center items-center bg-slate-800 ">
        <div className="bg-slate-900 w-3/5 md:w-2/5 h-fit py-6 pb-20 flex flex-col items-center max-w-2xl ">
          <h1 className="pt-14 font-semibold text-3xl font-serif">Sign In</h1>
          <form action="#" className="flex flex-col text-sm mt-10 md:w-2/3">
            <label htmlFor="username" className="">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="focus:outline-none  bg-transparent border-b border-blue-300 mb-4"
            />
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="focus:outline-none  bg-transparent border-b border-blue-300"
            />
            <Link
              href={"/"}
              className="text-xs text-gray-400 pt-1 underline underline-offset-2 opacity-80 hover:opacity-100 mt-1 md:text-sm w-full"
            >
              Dont have an account?
            </Link>
            <button className="bg-zinc-900 mt-4  my-3 border-[1px] rounded-sm hover:bg-zinc-950 py-2">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
