"use client"
import useSWR from 'swr'
import Heading from '@/components/ui/Heading'
import React from 'react'
import OrderCard from '@/components/order/OrderCard'
import { OrderWithProducts } from '@/src/lib/types'


const OrdersPage = () => {
  const url = '/admin/orders/api';

  // funcion fetcher para consultar la api
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)   // asigna data a fetcher

  const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  })

  if (error) return <p>Hubo un error al consultar las órdenes. Espera un momento...</p>
  if ( isLoading) return <p>Cargando...</p>
  if (data) return (
    <>
        <Heading>Administrar Órdenes</Heading>


        {data.length ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5'>
            {data.map( order => (
              <OrderCard 
                key={order.id}
                order={order}
              />
            ))}
          </div>
        ) : <p className="text-center">No hay ordenes Pendientes</p>}
    </>
  )
}

export default OrdersPage
