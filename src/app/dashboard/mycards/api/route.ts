import prisma from "@/lib/db";


export async function DELETE(req: Request, res: Response) {
    try {
        const { id, email } = await req.json();
        console.log("id:", id);
        console.log("email:", email);
        const deleteCard = await prisma.flashCard.delete({
            where: {
                owneremail: email,
                id: id,
            }

        })
        if (!deleteCard) {
            return Response.json({ message: "error deleting card" }, { status: 500 })
        }
        return Response.json({ message: "card deleted successfully" }, { status: 200 })
    }
    catch (err) {
        return Response.json({ message: "error in card backend" }, { status: 500 })
    }
}

