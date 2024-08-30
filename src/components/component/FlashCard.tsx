"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';

interface Flashcard {
    question: string;
    answer: string;
}

export default function FlashCard({ question, answer }: Flashcard) {
    const [toggleQuestion, setToggleQuestion] = useState(false);
    useEffect(() => {
        setToggleQuestion(false);
        return () => {
            console.log('Component unmounted');
        };
    }, [question])
    return (
        <div
            className="h-56 w-56 relative cursor-pointer"
            onMouseEnter={() => setToggleQuestion(!toggleQuestion)}
            onMouseLeave={() => setToggleQuestion(!toggleQuestion)}
        >
            <div
                className={`absolute inset-0 flex justify-center items-center text-md font-serif text-black bg-gray-100 border-2 shadow-md shadow-slate-100 border-slate-400 transition-transform duration-800 ease-in-out`}
                style={{
                    transform: toggleQuestion ? "rotateY(180deg)" : "rotateY(0deg)",
                    perspective: "1000px"
                }}
            >
                <div
                    className="h-full w-full flex justify-center items-center text-center"
                    style={{
                        transform: toggleQuestion ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    {!toggleQuestion ? question : answer}
                </div>
            </div>
        </div>
    );
}
