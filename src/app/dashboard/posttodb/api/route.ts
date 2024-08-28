import prisma from "@/lib/db";
export async function POST(req: Request, res: Response) {
    try {
        const { title, email, flashCards } = await req.json();
        const addFlashCards = await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                flashCards: {
                    create: {
                        title: title,
                        Cards: JSON.stringify(flashCards)
                    }
                }
            }
        })
        if (!addFlashCards) {
            console.log("error here");
            return Response.json({ message: "error updating flashcards" }, { status: 500 })
        }
        return Response.json({ message: "data saved successfully" }, { status: 200 })
    }
    catch (e) {
        return Response.json({ message: "Error saving data" }, { status: 500 });
    }

}