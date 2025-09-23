"use client"
import { useStore } from '@/src/store'
import React, { useMemo } from 'react'
import {toast} from 'react-toastify'
import ProductDetails from './ProductDetails'
import { formatCurrency } from '@/src/lib/utils'
import createOrder from '@/actions/create-order-actions'
import { OrderSchema } from '@/src/schema'

export default function OrderSummary() {

  const order = useStore( (state) => state.order)     // extrae la información del state global order
  const clearOrder = useStore( (state) => state.clearOrder)
  const total = useMemo( ()=> order.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [order])  // item es cada elemento de order

  // funcion para crear la orden
  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    // validación en el cliente
    const result = OrderSchema.safeParse(data)    
    // console.log(result)  
    if(!result.success){
      result.error.issues.forEach( (issue) => {
        toast.error(issue.message)
      })
      return      // si no se cumple la validación, sale  de la función y ya no se evalúa en el servidor
    }

    // validación en el servidor y guardado de la orden
    const response = await createOrder(data )
    
    if(response?.errors){
        response.errors.forEach( (issue) => {
        toast.error(issue.message)
      })
    }

    toast.success('Pedido realizado correctamente')
    clearOrder()
  }

  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'> {/** overflow fija el sidebar */}
      <h1 className='text-4xl text-center font-black'>Mi pedido</h1>

      {order.length === 0 ? <p className='text-center my-10'>Agrega los productos a tu Orden</p> : (
        
        <div className='mt-5'>
          {order.map(item => (
            <ProductDetails
              key={item.id}
              item={item}
            />
          ))}

          <p className='text-2xl mt-20 text-center'>Total a pagar: {' '}
            <span className='font-bold'>{formatCurrency(total)}</span>
          </p>

          <form 
            className='w-full mt-10 space-y-5'
            action={handleCreateOrder}
          >
            <input 
              type="text" 
              className='bg-white border border-gray-100 p-2 w-full transition duration-200 ease-in-out hover:border-blue-500 focus:outline-blue-700 '
              placeholder='Tu nombre'
              name='name'
            />
            <input 
              type="submit" 
              className='py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold'
              value='Confirmar Pedido'
            />
          </form>
        </div>
      )}

    </aside>
  )
}
