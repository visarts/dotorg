import React from 'react'
import { StyledFooter } from './Footer.style'

const Footer = props => {
  return (
    <StyledFooter>
      {decodeURIComponent('%C2%A9')} 2004-2018 Portitude
    </StyledFooter>
  )
}

export default Footer
