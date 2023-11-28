import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id;

    const orderItems = await req.json();
    console.log("🚀 ~ file: route.ts:12 ~ POST ~ body:", orderItems);

    // const { data } = body;
    // const orderItems = data;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!userId) {
      return new NextResponse("Missing user id", { status: 406 });
    }

    if (!orderItems) {
      return new NextResponse("Items missing", { status: 405 });
    }

    const order = await prismadb.order.create({
      data: {
        userId,
        orderItems: {
          create: orderItems.map((orderItemId: string) => ({
            orderItem: {
              connect: {
                id: orderItemId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
