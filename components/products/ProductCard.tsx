import { formatCurrency, getImagePath } from "@/src/lib/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product            // type dado por el modelo de Prisma
}


const ProductCard = ({product}: ProductCardProps) => {
    
    const imagePath = getImagePath(product.image)
    return (
        <div className="border shadow-xl bg-white flex flex-col min-h-[622px]">
            <Image 
                height={500}
                width={400}
                src={imagePath} 
                alt={`Imagen platillo ${product.name}`} 
                quality={75}  
                className="p-3 transition duration-200 hover:scale-103 cursor-pointer"  
            />
            <div className="p-5 flex flex-col justify-between flex-1">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
                <AddProductButton
                    product = {product}
                />
            </div>
        </div>
    )
}

export default ProductCard
