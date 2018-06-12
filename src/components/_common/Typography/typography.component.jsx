import { StyledTypography } from './typography.style'
// import './typography.style.scss'

const types = {
  headlineLarge: 'h1',
  headline: 'h1',
  subheadline: 'h2',
  title: 'h1',
  subtitle: 'h2',
  header: 'h3',
  subheader: 'h4',
  listPrimary: 'h3',
  listSecondary: 'span',
  paragraph: 'p',
}

const TypographyComponent = props => {
  // add any prop className to existing

  return (
    // React.createElement(elementType, {className, style: props.style}, props.children || '')
    <StyledTypography type={props.type} element={types[props.type] || 'h1'} gutterBottom={props.gutterBottom}>
      {props.children}
    </StyledTypography>
  )
}

export default TypographyComponent
