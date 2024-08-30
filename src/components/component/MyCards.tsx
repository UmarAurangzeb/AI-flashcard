"use client"
import React, { useEffect, useState } from 'react'
import FlashCard from './FlashCard';
import { usePathname } from 'next/navigation'
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
export default function MyCards({ ParsedCards }: any) {
    const pathname = usePathname()
    const [openCards, setOpenCards] = useState(false);
    const [index, setIndex] = useState(undefined);
    const router = useRouter()

    const handleClick = (index: number) => {
        setIndex(index);
        console.log(index);
        setOpenCards(true);
        console.log(openCards);
    }
    const handleDelete = async (ownerEmail, cardId) => {
        const res = await fetch('/dashboard/mycards/api', {
            method: 'DELETE',
            headers: {
                contentType: 'application/json'
            },
            body: JSON.stringify({
                email: ownerEmail,
                id: cardId
            })
        })
        if (!res.ok || res.status === 500) {
            console.log("error deleting card");
        }
        else {
            console.log("card deleted successfully");
            router.refresh();
        }

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
                                    ParsedCards.map((card, index) => {
                                        return (
                                            <div key={index} className='w-96 h-12 flex justify-between items-center bg-gray-100 text-gray-500 rounded-md cursor-pointer hover:bg-slate-100 text-wrap my-2 px-2 border-[1px] border-gray-200 shadow-md '>
                                                <div className='text-gray-700 font-sans flex-grow' onClick={() => {
                                                    handleClick(index)
                                                }
                                                } >{card.title} </div>
                                                <MdDeleteOutline className='text-red-600' onClick={() => handleDelete(card.owneremail, card.id)} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </>
                    )
                        : (
                            <div>
                                <div className='mx-auto mt-20  text-3xl md:text-4xl text-white text-center font-semibold  '>{ParsedCards[index].title}</div>
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
