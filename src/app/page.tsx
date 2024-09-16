"use client";
import Typewriter from "typewriter-effect";
import { Rajdhani } from "next/font/google";
import Link from "next/link";
import { easeInOut, motion } from "framer-motion";
const rajdhani = Rajdhani({
  weight: '400',
  subsets: ["devanagari"]
});

const cardVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1, x: 0,
    transition: {
      duration: 0.5, // Set the duration for the animation
      ease: "easeInOut",
      delay: 0.5
      // You can use ease types like "easeInOut" for smoother transitions
    },


  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

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

          <motion.h1
            initial={{
              opacity: 0,
              y: -50,
              scale: 0.8,
              rotate: -20
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0
            }}
            transition={{
              duration: 0.8,
              ease: [0.42, 0, 0.58, 1],
            }}
            className="text-white font-sans lg:text-3xl mt-4 text-center"
          >
            Your go-to platform for mastering concepts with AI-powered flashcards.
          </motion.h1>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.9,
              ease: [0.42, 0, 0.58, 1],
            }}
            className="flex flex-row gap-x-3 text-sm md:text-md text-white mt-6">
            <Link href="/dashboard">
              <motion.button className="md:w-32 md:h-12 py-2 w-28 border-2 rounded-2xl bg-red-600 hover:bg-red-700">
                Home
              </motion.button>
            </Link>
          </motion.div>
          <div className="flex mt-28 text-sm gap-4 max-w-5xl px-4 ">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-4"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-gradient-to-r from-slate-800 to-sky-950 w-1/3"
                >
                  <div className="border-[1px] border-red-400 rounded-sm border-solid card p-4 hover:transform hover:translate-z-[-20px] transition-transform duration-300 w-full h-full">
                    <h1 className="text-white text-md text-center font-bold">
                      {card.title}
                    </h1>
                    <p className="text-white break-words text-wrap mt-2 text-center">
                      {card.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
