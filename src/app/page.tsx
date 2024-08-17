"use client";
import Typewriter from "typewriter-effect";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  weight: '400', // Specify the weight as a string or number // Optionally specify subsets if needed
  subsets: ["devanagari"]
});
export default function Home() {
  return (
    <>

      <div className={`h-screen w-screen bg-cover bg-center flex justify-center items-center`} style={{ backgroundImage: `url("bg1.jpg")` }} >
        <div className="flex flex-col items-center justify-center text-red-500 text-3xl lg:text-6xl">
          <h1>
            <Typewriter
              options={{ loop: true }}
              onInit={(typewriter) => {
                typewriter.typeString("WELCOME TO FLASHCARDS.AI").pauseFor(600).deleteChars(13).typeString(" FLASHCARDS.AI").start()
              }}
            />
          </h1>

          <h1 className="text-white font-sans lg:text-3xl  mt-4 text-center">Your go-to platform for mastering concepts with AI-powered flashcards.</h1>
          <div className="flex flex-row gap-x-3 text-sm md:text-md text-white mt-6">
            <button className="md:w-32 md:h-12 py-2 w-28 border-2 rounded-2xl bg-red-600 hover:bg-red-700">
              Subscribe
            </button>
            <button className="md:w-32 md:h-12 w-28 border-2 rounded-2xl bg-red-600 hover:bg-red-700">
              Home
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
