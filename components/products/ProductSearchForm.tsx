"use client"
import { SearchSchema } from "@/src/schema"
import { redirect } from "next/navigation"
import { toast } from "react-toastify"

const ProductSearchForm = () => {

    const handleSearchForm = (formData: FormData) => {

        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data)
        // console.log(result)

        if(!result.success){
            result.error.issues.forEach( issue => {
                toast.error(issue.message)
            });
            return;         // sale del handler
        }
        // redireccionar hacia otra página
        redirect(`/admin/products/search?search=${result.data.search}`)

    }
    return (
        <form 
            action={handleSearchForm} 
            className="flex items-center"
        >
            <input 
                type="text" 
                placeholder="Buscar Producto" 
                className="p-2 placeholder-gray-400 w-full" 
                name="search"
            />
            <input 
                type="submit" 
                value="Buscar" 
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer" />
        </form>
    )
}

export default ProductSearchForm
