"use client"
import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
    product: Product
}

const AddProductButton = ({product}: AddProductButtonProps) => {

    const addToOrder = useStore( (state) => state.addToOrder)
    return (
        <>
            <button
                type="button"
                className="bg-indigo-600 transition duration-200 ease-in-out hover:bg-indigo-800 text-white w-full shadow-md rounded-xl mt-5 p-3 uppercase font-bold cursor-pointer"
                onClick={ () => addToOrder(product)}
            >Agregar</button>
        </>
    )
}

export default AddProductButton
