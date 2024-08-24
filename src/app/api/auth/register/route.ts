import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import db from "@/libs/prisma"

interface UserData {
  username: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const data: UserData = await request.json();

    const userFound = await db.user.findFirst({
      where: {
        OR: [
          { username: data.username },
          { email: data.email }
        ]
      }
    })

    if (userFound) {
      return NextResponse.json({
        message: "user already exist"
      },
        {
          status: 400
        });
    }

    console.log(data);
    const hashedPassword: string = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });

    const { password: _, ...user } = newUser;
    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({
        message: error.message
      }, { status: 500 });
    }

    return NextResponse.json({
      message: "An unknown error occurred"
    }, { status: 500 })
  }
}
