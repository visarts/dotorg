import styled, { css } from 'styled-components'

const StyledApp = styled.div`
  ${props => css`
    margin-top: ${props.isRoot ? props.theme.sizes.containers.headerHeight : props.theme.sizes.containers.headerHeight_sm};
    color: ${props.theme.colors.foreground.dark};
    transition: .2s margin-top;
  `}
`

export default StyledApp
