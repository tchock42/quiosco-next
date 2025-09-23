import CategoryIcon from '../ui/CategoryIcon'
import {prisma} from '@/src/lib/prisma'
import Logo from '../ui/Logo';

// funcion para traer los clientes de la base de datos | similar a un loader
async function getCategories (){
  const categories = await prisma.category.findMany()     // consulta las categorias y las trae
  return categories;
}

export default async function OrderSidebar() {

  const categories = await getCategories()
  

  return ( 
    <aside className="md:w-72 md:h-screen bg-white">
      <Logo />
      <nav className="mt-10">
        {categories.map(category => (
          <CategoryIcon
            key={category.id}
            category={category}
          />
        ))}
      </nav>
    </aside>
  )
}
