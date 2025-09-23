import {Order, OrderProducts, Product} from '@prisma/client'

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {  // type para la creación de una orden. Un pedido son varias ordenes
    quantity: number
    subtotal: number
}

// type para desplegar ordenes en /admin/orders
export type OrderWithProducts = Order & {       // type para /admin/products
    orderProducts: (OrderProducts & {           // usa el type de prisma
        product: Product                        // también es un type de prisma
    })[]
}

