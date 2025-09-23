import {z} from 'zod'

export const OrderSchema = z.object({           // para guardar la orden no se usa la imagen ni la categoría
    name: z.string()
        .min(1, 'Tu nombre es Obligatorio'),    // nombre del usuario
    total: z.number()
        .min(1, 'Hay errores en la orden'),    // debe se mayor a 0 la cantidad
    order: z.array(z.object({                  // array de objetos
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})

// schema para completar ordenes
export const OrderIdSchema = z.object({
    orderId: z.string()                                         // lo define como string
        .transform( value => parseInt(value))                   // transforma en entero
        .refine( value => value > 0, {message: 'Hay errores'})  // define la validación mediante refine
})

// schema para formulario de busqueda de productos
export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, {message: 'La búsqueda no puede ir vacía'})
})

// schema para formulario para creación de productos
export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: 'El Nombre del Producto no puede ir vacio'}),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value)) 
        .refine((value) => value > 0, { message: 'Precio no válido' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value)) 
        .refine((value) => value > 0, { message: 'La Categoría es Obligatoria' })
        .or(z.number().min(1, {message: 'La Categoría es Obligatoria' })),
    image: z.string()
        .min(1, {message: 'La imagen es obligatoria'})
})