"use server"

// server action para crear registros de ordenes
import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

const createOrder = async (data: unknown) => {

    const result = OrderSchema.safeParse(data)  // validación con zod
    
    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    // cumplidas las dos validaciones, se guardan la orden en la bd
    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {        // itera para ir construyendo el orderProducts a partir del result.data
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export default createOrder