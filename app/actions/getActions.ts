import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

export type Automobile = {
  id: string;
  type: string;
  price: string;
  description: string;
};

export type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
};

export async function getOrderById(userId: string) {
  try {
    const order = await prisma?.order.findFirst({
      where: {
        userId,
      },
      include: {
        user: true,
        orderItems: {
          include: {
            automobile: true,
            service: true,
          },
        },
      },
    });
    return order;
  } catch (error) {
    console.log(error);
  }
}

export async function getAutomobileByOrder() {
  const automobiles = await prismadb.automobile.findMany();
  const formattedAutomobiles: Automobile[] = automobiles.map((automobile) => ({
    id: automobile.id,
    type: automobile.type,
    price: formatter.format(automobile.price.toNumber()),
    description: automobile.description,
  }));
  return formattedAutomobiles;
}

export async function getServices() {
  const services = await prismadb.service.findMany();
  const formattedServices: Service[] = services.map((service) => ({
    id: service.id,
    name: service.name,
    price: formatter.format(service.price.toNumber()),
    description: service.description,
  }));

  return formattedServices;
}

export async function getOrder(userId: string) {
  const orders = await prismadb.order.findMany({
    where: {
      userId,
    },
  });

  return orders;
}
