import React from 'react'
import prisma from '@/lib/db'
import { auth } from "@/auth";
import MyCards from '@/components/component/MyCards';
export default async function page() {
    const session = await auth();
    console.log(session.user.email);
    const userflashcards = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            flashCards: true, // Include the related flashCards
        },
    })

    if (!userflashcards) {
        return <>
            <h1>error,please try again later</h1>
        </>
    }
    const ParsedCards = userflashcards.flashCards.map(element => {
        return {
            ...element,
            Cards: JSON.parse(element.Cards)
        }
    });
    console.log(ParsedCards);
    return (
        <MyCards ParsedCards={ParsedCards} />
    )
}
