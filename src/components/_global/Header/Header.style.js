import styled, { css, keyframes } from 'styled-components'
import { globalGutters, paddingHorizontal } from 'config/utils'
import { Link } from 'react-router-dom'

const iconAnimation = keyframes`
  0% {color: #B44;}
  50% {color: #34A;}
  100% {color: #B44;}
`

export const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  flex-flow: row;
  align-items: center;
  top: 0px;
  right: 0px;
  left: 0px;
  ${globalGutters()}
  ${paddingHorizontal('sm')}
  ${props => css`
    z-index: ${props.theme.layers.header};
    background: ${props.theme.colors.background.darker};
    height: ${props.isRoot ? props.theme.sizes.containers.headerHeight : props.theme.sizes.containers.headerHeight_sm};
    border-bottom: ${props.theme.colors.foreground.darkest};
    box-shadow: ${props.theme.boxShadows[20]}
  `}
`

export const StyledHeaderNavigation = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`

export const StyledHeaderNavigationLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  ${props => css`
    color: ${props.theme.colors.foreground.light};
    margin-right: ${props.theme.sizes.sm};
  `}
`
export const StyledHeaderNavigationIcon = styled.span`
  animation-name: ${iconAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`
