"use client"

import createProduct from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import {toast} from 'react-toastify'

const AddProductForm = ({children}: {children: React.ReactNode}) => {

    const router = useRouter();

    // funcion para generar el producto nuevo
    const handleSubmit = async (formData: FormData) => {
        
        const data = {      // se obtiene de los name
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        // validación con schema
        const result = ProductSchema.safeParse(data)
        
        if(!result.success){
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return                                  // sale del handleSubmit
        }
        // Guardar en la base de datos
        const response = await createProduct(result.data)

        if(response?.errors){
            response.errors.forEach( issue => {
                toast.error(issue.message)
            })
            return      // sale del flujo de programa
        }

        // si no hay errores
        toast.success('Producto creado correctamente');
        router.push('/admin/products')      // se redirige despues de guardar
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md hover:shadow-2xl transition duration-200 max-w-3xl mx-auto">
            <form 
                action={handleSubmit}
                className="space-y-5"
            >
                {/* <ProductForm />  Pasar de componente de cliente a servidor*/}
                {children}     {/* ProductForm */}

                <input 
                    type="submit" 
                    className="bg-indigo-600 transition duration-300 ease-in-out hover:bg-indigo-800 rounded-md text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"    
                    value="Registrar Producto"
                />
            </form>
        </div>
    )
}

export default AddProductForm
