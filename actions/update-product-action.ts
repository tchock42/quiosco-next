"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

const updateProduct = async (data: unknown, id:number) => {

    const result = ProductSchema.safeParse(data)

    // validación del servidor
    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    // guarda en la base de datos
    await prisma.product.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/admin/products')
}

export default updateProduct