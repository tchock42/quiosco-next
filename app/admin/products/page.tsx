import {redirect} from 'next/navigation'
import Heading from '@/components/ui/Heading';
import {prisma} from '@/src/lib/prisma'
import ProductTable from '@/components/products/ProductTable';
import ProductsPagination from '@/components/products/ProductsPagination';
import Link from 'next/link';
import ProductSearchForm from '@/components/products/ProductSearchForm';

// consulta para traer el numero de registros en Products para el paginador
async function productCount() {
  return await prisma.product.count();
}

// consulta para traer los productos paginados
async function getProducts(page: number, pageSize: number){     
  const skip = (page - 1) * pageSize;   // si es la pagina 2: (2 - 1) *10 = salta 10, pagina 3: (3 - 1)*10=20
  const products = await prisma.product.findMany({
    take: pageSize, 
    skip: skip,
    include: {
      category: true
    }
  })

  return products; // 
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>> // type inferido por typescrip para incluir categoria en Product

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [page: string]: string | string[] | undefined }>;     
}) => {        // componente principal, toma el query string
  const {page = "1"} = await searchParams       // extrae la propieda page del searchParams y le da un valor por default de 1
  const currentPage = parseInt(page as string, 10) || 1   // convierte en integer
  const pageSize = 10                           // tamaño de la página

  if(currentPage < 0) redirect('/admin/products')
  const productsData = getProducts(currentPage, pageSize)     // inicializa el data con las consultas
  const totalProductsData = productCount()

  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])  // realiza las consultas asíncronas
  const totalPages = Math.ceil(totalProducts / pageSize)

  // si page es demasiado alto para totalPages (url manipulada por el usuario)
  if(currentPage > totalPages) redirect('/admin/products')
  
  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <Link
          href="/admin/products/new"
          className='bg-amber-400 w-full lg:w-auto px-10 py-3 text-center font-bold cursor-pointer'
        >Crear Producto</Link>
        <ProductSearchForm />
      </div>
      <ProductTable
        products = {products}
      />
      <ProductsPagination
        page={currentPage}
        totalPages = {totalPages}
      />
    </>
    
  )
}

export default ProductsPage
