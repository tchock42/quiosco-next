import {prisma} from '@/src/lib/prisma'
import ProductCard from '@/components/products/ProductCard'
import Heading from '@/components/ui/Heading'
import { notFound } from 'next/navigation'

type CategoryProps = {
  category: string
}
// //obtener los slugs de categorias desde Prisma
// export async function generateStaticParams() {
//   const categories = await prisma.category.findMany({
//     select: { slug: true }
//   });

//   return categories.map(({ slug }) => ({ category: slug }));
// }


// obtener los productos segun categoria seleccionada
const getProducts = async (category: string) => {   // se le pasa la categoria seleccionada

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products;
}

export default async function OrderPage({params}: {params:Promise<CategoryProps>}) { // obtiene el slug de la url usando params
  const {category} = await params
  const products = await getProducts(category) // consulta la bd para opbtener los productos a aprtir de la categoría
  
  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuación</Heading>
      <div className='grid gap-4 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 items-start'>
        {products.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
