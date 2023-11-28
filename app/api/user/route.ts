import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { name, email, password } = body;

    if (currentUser) {
      return new NextResponse("Already authenticated", { status: 403 });
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 405 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
        role: email === "guybuganim@gmail.com" ? "admin" : "user",
        // orders: {
        //   create: [],
        // },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    const body = await req.json();

    const { email } = body;

    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
