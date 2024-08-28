"use client"
import React, { useEffect, useState } from 'react'
import FlashCard from './FlashCard';
import { usePathname } from 'next/navigation'
export default function MyCards({ ParsedCards }: any) {
    const pathname = usePathname()
    const [openCards, setOpenCards] = useState(false);
    const [index, setIndex] = useState(undefined);
    const handleClick = (index: number) => {
        setIndex(index);
        console.log(index);
        setOpenCards(true);
        console.log(openCards);
    }

    return (
        <div className=' flex flex-col'>


            <div className='max-w-6xl mx-auto '>
                {
                    !openCards ? (
                        <>
                            <div className=' mt-40 font-serif text-3xl text-black text-center'>My Cards</div>
                            <div className='flex flex-row justify-center flex-wrap mt-6 max-w-6xl gap-x-2' >
                                {
                                    ParsedCards.map((card, index) => (
                                        <div onClick={() => {
                                            handleClick(index)
                                        }
                                        } key={index} className='w-48 h-48 flex justify-center items-center bg-gray-100 text-gray-500 rounded-md cursor-pointer hover:bg-slate-100 text-wrap my-2 '>
                                            {card.title}
                                        </div>

                                    ))
                                }

                            </div>
                        </>

                    )
                        : (
                            <div>
                                <div className='mx-auto mt-20  text-3xl md:text-4xl text-white text-center font-semibold'>{ParsedCards[index].title}</div>
                                <div className='flex flex-row flex-wrap gap-x-4 gap-y-3 mt-4 mx-auto max-w-6xl justify-center mb-5'>
                                    {ParsedCards[index].Cards.map((element, index) => (
                                        <div key={index} className=''>
                                            <FlashCard question={element.front} answer={element.back} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                }
            </div>
        </div>

    )
}
