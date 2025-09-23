"use client"

import { useFormStatus } from "react-dom"

const OrderCardButton = () => {

    const {pending} = useFormStatus()
    return (
        <button
            type="submit"
            className="flex items-center justify-center gap-4 bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            value='Marcar Orden Completada'
            disabled={pending}
        >{pending && <span className="loader"></span>}Marcar Orden Completada</button>
    )
}

export default OrderCardButton
