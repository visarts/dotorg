import styled from 'styled-components'
import { globalGutters, paddingHorizontal } from 'config/utils'

export const StyledFooter = styled.div`
  position: absolute;
  background: ${props => props.theme.colors.background.darker};
  opacity: .8;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: ${props => props.theme.sizing.footerHeight};
  ${globalGutters()}
  ${paddingHorizontal('sm')}
`
