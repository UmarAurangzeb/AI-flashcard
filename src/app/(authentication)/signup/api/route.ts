import { hash } from "bcryptjs"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db";
import { User } from "@/types/DBtypes";
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log({ email, password });

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        if (user) {
            console.log("user already exists");
            return Response.json({ message: "user already exists" }, { status: 406 })
        }
        else {
            const data = await setParams(password);
            const newuser = await prisma.user.create({
                data: {
                    email: email,
                    password: data.hashedPassword,
                }
            })
            if (!newuser) {
                return Response.json({ message: "error creating user" }, { status: 401 })
            }
            return Response.json({ message: "success" }, { status: 200 })
        }

    } catch (e) {
        console.log(e);
        return Response.json({ message: "failed registration", e }, { status: 500 });
    }

}

async function setParams(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hash(password, salt);
    return { hashedPassword };
}