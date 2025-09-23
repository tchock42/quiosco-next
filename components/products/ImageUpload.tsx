"use client"
import { getImagePath } from "@/src/lib/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus} from 'react-icons/tb'

type ImageUploadProps = {
  image: string | undefined
}

const ImageUpload = ({image}: ImageUploadProps) => {

  const [imageURL, setImageURL] = useState('')

  return (

    <CldUploadWidget 
      uploadPreset="quiosco-next"
      onSuccess={ (result, {widget}) => {
        
        if(result.event === 'success'){     
          widget.close();
          // @ts-ignore
          setImageURL(result.info.secure_url)
        }
      }}
      options={{
        maxFiles:1
      }}
    >
        { ({open}) => (
            <>
                <div className="space-y-2">
                    <label className="text-slate-800">Imagen del Producto</label>
                    <div 
                      onClick={ () => open()}
                      className="relative cursor-pointer hover:opacity-70 transition duration-200 p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                    >
                      <TbPhotoPlus
                        size={50}
                      />
                      <p className="text-lg font-semibold">Agregar Imagen</p>
                    
                      {imageURL && (
                        <div
                          className="absolute inset-0 w-full h-full" // relativo al div con class relative
                        >
                          <Image  
                            fill
                            style={{objectFit: 'contain'}}
                            src={imageURL}
                            alt="Imagen de Producto"
                          />
                        </div>
                      )}
                    </div>
                </div>

                {image && !imageURL && (    // si hay imagen en bd pero no en cloud
                  <div className="space-y-2">
                    <label>Imagen Actual: </label>
                    <div className="relative w-64 h-64">
                      <Image  
                        fill
                        style={{objectFit: 'contain'}}
                        src={getImagePath(image)}     // usa la funcion de utils para detectar si viene de public o cloudinary
                        alt="Imagen de Producto"
                      />
                    </div>
                  </div>
                )}
                <input 
                  type="hidden" 
                  name="image"  
                  defaultValue={imageURL ? imageURL : image}        // guarda la url de la imagen para enviarla a la bd
                />
            </>
        )}
    </CldUploadWidget>
  )
}

export default ImageUpload
