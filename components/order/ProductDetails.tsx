import { OrderItem } from '@/src/lib/types'
import { formatCurrency } from '@/src/lib/utils'
import { MinusIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useMemo } from 'react'
import { useStore } from '@/src/store'

type ProductDetailsProps = {
    item:OrderItem
}
const MIN_ITEMS = 1
const MAX_ITEMS = 5;

const ProductDetails = ({item}: ProductDetailsProps) => {
    
    const increaseQuantity = useStore((state) => state.increaseQuantity )
    const decreaseQuantity = useStore((state) => state.decreaseQuantity )
    const removeItem = useStore((state) => state.removeItem )
    const disableDecreaseButton = useMemo( () => item.quantity === MIN_ITEMS, [item])   // espera a cambios en item y asigna el boolean de si valor
    const disableIncreaseButton = useMemo( () => item.quantity === MAX_ITEMS, [item])

    return (
        <div className='shadow space-y-1 p-4 bg-white border-t border-gray-200'>
            <div className='space-y-4'>
                <div className='flex justify-between items-start'>
                    <p className='text-xl font-bold'>{item.name}</p>     
                    <button 
                        type='button'
                        onClick={() => removeItem(item.id)}
                        className='cursor-pointer'
                    >
                        <XCircleIcon className="text-red-600 h-8 w-8"/>
                    </button>
                </div>
                <p className='text-2xl text-amber-500 font-black'>
                    {item.price}
                </p>

                <div className='flex gap-5 px-10 bg-gray-100 w-fit rounded-lg'>
                    <button
                        type='button'
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={disableDecreaseButton}
                        className="border bg-white border-gray-300 rounded-md transition duration-100 hover:border-gray-200 hover:bg-gray-50 disabled:opacity-20 cursor-pointer disabled:cursor-auto"
                    >
                        <MinusIcon className="h-6 w-6"/>
                    </button>
                    <p className='text-lg font-black'>
                        {item.quantity}
                    </p>
                
                    <button
                        type='button'
                        onClick={() => increaseQuantity(item.id)}
                        className="border bg-white border-gray-300 rounded-md transition duration-100 hover:border-gray-200 hover:bg-gray-50 disabled:opacity-20 cursor-pointer disabled:cursor-auto"
                        disabled={disableIncreaseButton}
                    >
                        <PlusIcon className="h-6 w-6"/>
                    </button>
                </div>
                <p className='text-xl font-black text-gray-700'>
                    Subtotal: {' '}
                    <span className='font-normal'>{formatCurrency(item.subtotal)}</span>
                </p>
            </div>
        </div>
    )
}

export default ProductDetails
