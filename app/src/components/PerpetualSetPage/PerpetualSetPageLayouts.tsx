import React from 'react'

import styled from 'styled-components'

export const ProductPageHeader = styled.div`
  @media (min-width: 768px) {
  }
`

export const ProductPageContent = styled.div``

interface ProductPageSectionProps {
  title: string
}

export const ProductPageSection: React.FC<ProductPageSectionProps> = ({
  title,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </SectionContainer>
  )
}

const SectionContainer = styled.div``

const SectionTitle = styled.h3`
  font-size: 28px;
  margin-top: 0;
`
