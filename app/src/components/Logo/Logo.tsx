import React from 'react'

import { useTheme } from 'react-neu'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

import indexLogoBlack from 'assets/logo512.png'

const Logo: React.FC = () => {
  const { darkMode } = useTheme()
  let logo
  if (window.innerWidth > 450) logo = darkMode ? indexLogoBlack : indexLogoBlack
  else logo = darkMode ? indexLogoBlack : indexLogoBlack

  return (
    <Link to={{ pathname: 'https://galleon.community' }} target={'_top'}>
      <StyledLogo>
        <StyledImage src={logo} alt='index-logo' />
      </StyledLogo>
    </Link>
  )
}

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledImage = styled.img`
  height: 32px;
  min-width: 32px;
`

export default Logo
