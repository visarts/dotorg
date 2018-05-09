import styled, { css } from 'styled-components'
import { globalGutters, paddingHorizontal } from 'config/utils'

export const StyledNav = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  transition: .3s all;
  ${globalGutters()};
  ${paddingHorizontal('sm')};
  ${props => css`
    color: ${props.theme.colors.foreground.light};
    height: ${props.theme.sizes.containers.navHeight};
    ${props.section && css`
      background: ${props.section === 'artwork'
        ? props.theme.colors.accent.purple
        : props.section === 'literature'
          ? props.theme.colors.accent.blue
          : props.theme.colors.background.dark};
    `}
    ${!props.section && css`
      height: 1px;
      background-color: transparent;
      padding: 0;
    `}
  `}
`
