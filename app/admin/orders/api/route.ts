import { prisma } from "@/src/lib/prisma";

export const dynamic = 'force-dynamic'  // permite que sean dinamicos y no se queden cacheados

export async function GET() {

    const orders = await prisma.order.findMany({
        where: {
          status: false
        },
        include: {                  // atributo para acceder a la relacion con tabla pivote
          orderProducts: {
            include: {              // acceder a la tabla productos
              product: true
            },
          },
        }
    })
    
    return Response.json(orders);
}