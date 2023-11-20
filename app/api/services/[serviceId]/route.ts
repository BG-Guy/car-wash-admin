import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.serviceId) {
      return new NextResponse("Service Id is required", { status: 405 });
    }

    const service = await prismadb.service.delete({
      where: {
        id: params.serviceId,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { serviceId: string } }
) {
  try {
    const session = await getServerSession(options);

    const body = await req.json();
    const { name, price, description } = body;

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.serviceId) {
      return new NextResponse("Service Id is required", { status: 405 });
    }

    const updatedService = await prismadb.service.update({
      where: {
        id: params.serviceId,
      },

      data: {
        name,
        price,
        description,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
