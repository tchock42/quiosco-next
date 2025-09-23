"use client"

import useSWR from "swr"
import Logo from "@/components/ui/Logo"
import { OrderWithProducts } from "@/src/lib/types"
import LatestOrderItem from "@/components/order/LatestOrderItem"

const OrdersPage = () => {
  //consultar las ordenes de la api
  const url = 'orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)    // asigna data a fetcher
  const {data, error, isLoading} = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  console.log(data)
  if(isLoading) return <p>Cargando...</p>
  if(error) return <p>Error al cargar las órdenes</p>
  if(data) return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">Ordenes Listas</h1>
      <Logo />

      {data.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mt-10">
          {data.map(order => (
            <LatestOrderItem 
              order={order}
              key={order.id}
            />
          ))}
        </div>
      ) : <p>No hay órdenes listas</p>}

    </>
  )
}

export default OrdersPage
