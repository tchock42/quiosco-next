import Heading from '@/components/ui/Heading'
import Link from 'next/link'

const NotFound= () => {
  return (
    <div className='text-center'>
        <Heading>Producto no encontrado</Heading>
            <Link
                href='/admin/products'
                className='mt-10 bg-amber-400 hover:bg-amber-500 transition duration-200 ease-in-out text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto'
            >Ir a los Productos</Link>
    </div>
  )
}

export default NotFound
