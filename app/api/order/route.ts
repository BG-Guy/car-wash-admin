import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(options);

    const body = await req.json();
    console.log("🚀 ~ file: route.ts:12 ~ POST ~ body:", body);

    const { items } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!session.user.id) {
      return new NextResponse("Missing user id", { status: 406 });
    }

    if (!items) {
      return new NextResponse("Items missing", { status: 405 });
    }

    const order = await prismadb.order.create({
      data: {
        userId: session.user.id,
        orderItems: items,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
