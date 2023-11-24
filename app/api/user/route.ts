import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(options);

    const body = await req.json();

    const { name, email } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!session.user.id) {
      return new NextResponse("Missing user id", { status: 406 });
    }

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        orders: {
          create: [],
        },
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
    const session = await getServerSession(options);

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
