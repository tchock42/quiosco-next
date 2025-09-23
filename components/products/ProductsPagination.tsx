import Link from "next/link"

type ProductsPaginationProps = {
    page: number
    totalPages: number
}

const ProductsPagination = ({page, totalPages}: ProductsPaginationProps) => {

    const pages = Array.from({length: totalPages}, (_, i) => i + 1);        // crea un array con las paginas del paginador 1:totalPages
    
    return (
        <nav className='flex justify-center py-10'>
            {page > 1 && (                  // flecha a la izquierda del paginador
                <Link
                    className="bg-white py-2 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${+page - 1}`}
                >&laquo;</Link>
            )}
            
            {pages.map(currentPage => (
                <Link
                    key={currentPage}
                    className={ `${page === currentPage ? 'font-black bg-amber-400' : 'bg-white '} py-2 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    href={`/admin/products?page=${currentPage}`}
                >{currentPage}</Link>
            ))}

            {page < totalPages && (             // si page es  menor al total de paginas
                <Link                           // flecha a la derecha del paginador
                    className="bg-white py-2 px-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
                    href={`/admin/products?page=${+page + 1}`}
                >&raquo;</Link>
            )}
        </nav>
    )
}

export default ProductsPagination
