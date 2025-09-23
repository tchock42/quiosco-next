import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import Heading from '@/components/ui/Heading'
import React from 'react'

const CreateProductPage = () => {
  return (
    <>
      <Heading>Nuevo Producto</Heading>
      <AddProductForm>
        <ProductForm /> {/* Como children para que pase de componente de cliente a servidor (Composición) */}
      </AddProductForm>
    </>
  )
}

export default CreateProductPage
