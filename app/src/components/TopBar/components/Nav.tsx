import React from 'react'

import { NavLink } from 'react-router-dom'

import styled from 'styled-components'

import classNames from 'utils/className'

import LeverageProductsDropdown from './LeverageProductsDropdown'
import ProductsDropdown from './ProductsDropdown'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <nav className='hidden lg:py-2 lg:flex lg:space-x-4' aria-label='Global'>
        <span>
          <NavLink
            exact
            activeClassName='border-indigo-600 border-b-2 text-white'
            className='hover:bg-indigo-100 hover:text-gray-900 rounded-full py-2.5 px-3 border-b inline-flex items-center text-sm font-medium'
            to='/'
          >
            SOLUNAVAX Index
          </NavLink>
        </span>
        {/* <span>
          <NavLink
            exact
            activeClassName='border-indigo-600 border-b-2 text-white'
            className='hover:bg-indigo-100 hover:text-gray-900 rounded-full py-2.5 px-3 border-b inline-flex items-center text-sm font-medium'
            to='/'
          >
            SOLUNAVAX Index
          </NavLink>
        </span> */}
      </nav>
    </StyledNav>
  )
}

const StyledNav = styled.nav``

const StyledLink = styled(NavLink)``
const StyledOutboundLink = styled.a`
  color: ${(props) => props.theme.colors.grey[500]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[600]};
  }
`

export default Nav
