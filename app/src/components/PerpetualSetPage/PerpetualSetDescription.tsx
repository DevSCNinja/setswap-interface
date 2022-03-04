import React from 'react'

import { ProductPageSection } from './PerpetualSetPageLayouts'

const ProductDescription: React.FC = ({ children }) => {
  return <ProductPageSection title='About'>{children}</ProductPageSection>
}

export default ProductDescription
