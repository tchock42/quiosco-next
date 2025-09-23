import {create} from 'zustand'
import { OrderItem } from './lib/types'
import { Product } from '@prisma/client'

interface Store {                                       // definicion de estados y funciones
    order: OrderItem[]                                  // aqui se guardan 
    addToOrder: (product: Product) => void              // funcion para agregar productos a la orden
    increaseQuantity: (id: Product['id']) => void       // incrementar cantidad
    decreaseQuantity: (id: Product['id']) => void       // decrementar cantidad
    removeItem: (id: Product['id']) => void             // eliminar pedido
    clearOrder: () => void                              // limpiar orden
}

export const useStore = create<Store>( (set, get) => ({  // se extrae set para poder modificar el state
    order: [],       // valor inicial en el store. 
    addToOrder: (product) =>{           // definición de la funcion
        
        const {categoryId, image, ...data} = product;      // extrae id, name y price en data
        let items: OrderItem[] = [];                          // array auxiliar para guardar temporalmente la orden

        if(get().order.find( item => item.id === data.id)){   // si ya existe el producto en la orden
            // actualizar la cantidad
            items = get().order.map(item => item.id === data.id ? { // busca en los elementos de order y el que coincida, pasa item modificando quantity y subtotal y lo asigna al order temporal llamado items
                ...item,                                    // elemento actual
                quantity: item.quantity+1,                  // con cantidad y subtotal actualizados
                subtotal: item.price * (item.quantity + 1)
            } : item)                                       // si no coincide toma el mismo elemento sin modificar
        }else{                                  // si no existe el producto en la orden
            items = [...get().order, {          // obtiene el order de set ya que state solo está disponible en set y lo guarda en items y el nuevo producto lo agrega al final del array
                ...data,                        // toma la copia de id, name y price
                quantity: 1,                    // empieza en 1
                subtotal: 1*product.price       // cantidad*precio
            }]   
        }

        set( () => ({                      // toma el state para modificar state.order
            order: items                    // guarda en el state el array de order[] desde el array temporal items[]
        }));    
    },
    increaseQuantity: (id) =>{
        // identificar el producto que se está pasando
        // se usa directamente set con la lógica de comparación dentro asignando al order
        set( (state) => ({
            order: state.order.map(item => item.id === id ? {       // el { es para retornar
                ...item,                                // retorna el item actual
                quantity: item.quantity + 1,            // sobrescribiendo quantity y subtotal
                subtotal: item.price * (item.quantity + 1)
            } : item)                                   // si no coincide retorna el item integramente 
        }))
    },
    decreaseQuantity: (id) => {
        // revisar
        const items = get().order.map( item => item.id === id ? {   // si el elemento coincide con el id seleccionado
            ...item,                                                // copia el item actualizando quantity
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)                                                   // o pasa item sin modificar
        set( () => ({
            order:items                                             // guarda items en order
        }))
    },
    removeItem: (id) => {
        const items = get().order.filter(item => item.id !== id);   // retorna si cumple con ser diferente el id

        set( ()=> ({
            order: items
        }))
    },
    clearOrder: () => {
        set( () => ({
            order: []           // limpia el state y el DOM se actualiza
        }))
    },
}))