"use client";
import Typewriter from "typewriter-effect";
import { Rajdhani } from "next/font/google";
import Link from "next/link";

const rajdhani = Rajdhani({
  weight: '400',
  subsets: ["devanagari"]
});

const cards = [
  {
    title: "Generate Flashcards Effortlessly",
    content: "Create custom flashcards instantly with our easy-to-use generator"
  },
  {
    title: "Save and Organize Your Flashcards",
    content: "Save your flashcards and keep them organized in personalized decks"
  },
  {
    title: "Engage in Interactive Learning",
    content: "Enhance your studies with interactive flashcard sessions to track your progress"
  }
];

export default function Home() {
  return (
    <>
      <div className={`overflow-hidden bg-cover bg-center flex flex-col justify-center items-center mb-10`}>
        <div className="flex flex-col items-center justify-center font-semibold text-red-500 text-3xl lg:text-6xl mt-36">
          <h1>
            <Typewriter
              options={{ loop: true }}
              onInit={(typewriter) => {
                typewriter.typeString("WELCOME TO FLASHCARDS.AI")
                  .pauseFor(600)
                  .deleteChars(13)
                  .typeString(" FLASHCARDS.AI")
                  .start();
              }}
            />
          </h1>

          <h1 className="text-white font-sans lg:text-3xl mt-4 text-center">
            Your go-to platform for mastering concepts with AI-powered flashcards.
          </h1>
          <div className="flex flex-row gap-x-3 text-sm md:text-md text-white mt-6">
            <Link href="/dashboard">
              <button className="md:w-32 md:h-12 py-2 w-28 border-2 rounded-2xl bg-red-600 hover:bg-red-700">
                Home
              </button>
            </Link>
          </div>
          <div className="flex mt-28 text-sm gap-4 max-w-5xl px-4 ">



            {cards.map((card, index) => (
              <div className="bg-gradient-to-r from-purple-600 to-sky-950 w-1/3">
                <div key={index} className="border-[1px] border-red-400 rounded-sm border-solid  card p-4 hover:transform hover:translate-z-[-20px] transition-transform duration-300 w-full h-full">
                  <h1 className="text-white text-md text-center font-bold  ">{card.title}</h1>
                  <p className="text-white break-words text-wrap mt-2 text-center">{card.content}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
