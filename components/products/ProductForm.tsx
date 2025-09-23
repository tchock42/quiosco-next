// componente de servidor reutilizable para el formulario
import { prisma } from "@/src/lib/prisma"
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories(){
    return await prisma.category.findMany()
}

type ProductFormProps = {
    product?: Product
}

const ProductForm = async ({product}: ProductFormProps) => {

    const categories = await getCategories();
    // console.log('Cliente o servidor')
  
    return (
        <>
            <div className="space-y-2">                  {/* Primer input */}
                <label 
                    htmlFor="name"
                    className="text-slate-800"
                >Nombre:</label>
                <input 
                    id="name"
                    type="text" 
                    name="name"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Nombre del Producto"
                    defaultValue={product?.name}
                />
            </div> 
            <div className="space-y-2">
                <label 
                    htmlFor="price"
                    className="text-slate-800"
                >Precio</label>
                <input
                    id="price" 
                    type="text" 
                    name="price"
                    className="block w-full p-3 bg-slate-100"
                    placeholder="Precio del Producto"   
                    defaultValue={product?.price} 
                />
            </div>
            <div className="space-y-2">
                <label 
                    htmlFor="categoryId"
                    className="text-slate-800"    
                >Categoría:</label>
                <select 
                    name="categoryId" 
                    id="categoryId"
                    className="block w-full p-3 bg-slate-100"
                    defaultValue={product?.categoryId}
                >
                    <option value="">--Seleccione--</option>
                    {categories.map( category => (
                        <option 
                            value={category.id}
                            key={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div> 
            <ImageUpload
                image= {product?.image}
            />
        </>
    )
}
export default ProductForm
