import { formatCurrency } from "@/src/lib/utils"
import Link from "next/link"
import { ProductsWithCategory } from "@/app/admin/products/page"

type ProductTableProps = {
    // products: ({
    //     category: Category;
    //     } & Product)[]
    products: ProductsWithCategory
}

const ProductTable = ({products}: ProductTableProps) => {
  return (

    <div className='px-4 sm:px-6 lg:px-8 mt-20'>    {/* Contenedor principal, padding que se adapta al tamaño, margen superior amplio */}
    
        <div className='mt-8 flow-root'>            {/* margen superior y nuevo contexto de formato para evitar elementos flotantes colapsen el contenedor */}
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'> { /* scroll horizontal y margen negativo para compensar el padding responsivo */ }
                <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5'> { /* inline y min-w-full permite ocupe ancho disponible, alinea verticalmente */}
                    <table className='min-w-full divide-y divide-gray-300'> 
                        <thead>         
                            <tr>
                                <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                                    Producto
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Precio
                                </th>
                                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                                    Categoría
                                </th>
                                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-0'>  {/* permite posicionar elementos dentro como iconos flotantes */}
                                    <span className='sr-only'>Acciones</span>           {/* oculta texto visualmente excepto para lectores de pantalla */}
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {products.map( product => (
                                <tr key={product.id}> 
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"> {/* celda */}
                                        {product.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {formatCurrency(product.price)}
                                    </td> 
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {product.category.name}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">   {/* area de acciones*/}
                                        <Link
                                            className="text-indigo-600 hover:text-indigo-800"
                                            href={`/admin/products/${product.id}/edit`}
                                        >Editar <span className="sr-only">, {product.name}</span></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}


export default ProductTable
    