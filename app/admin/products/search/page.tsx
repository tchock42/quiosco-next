import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import {prisma} from '@/src/lib/prisma'

//funcion para buscar los productos
async function searchProducts(searchTerm: string){
    const products = prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })

    return products;
}


// componente principal
const SearchPage = async ({
    searchParams,
}: {                        // [index: index type]: value type
    searchParams: Promise< { search: string}>
}) => {     // tipo especial para searchParams

    const {search} = await searchParams;
    
    const products = await searchProducts(search)

    return (
        <>
            <Heading>
                Resultado de búsqueda: {search}
            </Heading>
            <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
                <ProductSearchForm />
            </div>

            {products.length ? (
                <ProductTable
                    products = {products}
                />
            ) : <p className="text-center text-lg mt-10">No hay resultados</p>}
            

        </>
    )
}

export default SearchPage
