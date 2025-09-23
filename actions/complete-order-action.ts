"use server"
import {prisma} from '@/src/lib/prisma'
import { OrderIdSchema } from '@/src/schema'
import { revalidatePath } from 'next/cache'

export const completeOrder = async (formData: FormData) => {
    const data = {                          // se agrega en un data el input del boton con el orderId
        orderId: formData.get('order_id')   
    } 
    const result = OrderIdSchema.safeParse(data)    // validación 
    
    if(result.success){
        try {
            await prisma.order.update({         // actualiza y completa la orden
                where: {
                    id: result.data.orderId     // id de la orden actual
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())      // guarda la hora de la actualización
                }
            })
            revalidatePath('/admin/orders')
        } catch (error) {
            console.log(error)
        }
    }
}