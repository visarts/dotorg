import './typography.style.scss'

const types = {
  headline: 'h1',
  subheadline: 'h2',
  title: 'h1',
  subtitle: 'h2',
  header: 'h3',
  subheader: 'h4',
  listPrimary: 'span',
  listSecondary: 'span'
}

const TypographyComponent = props => {
  const elementType = types[props.type] || 'h1'
  // add any prop className to existing
  const className = `typography typography--${props.type || 'headline'} ${props.className || ''}`

  return (
    React.createElement(elementType, {className, style: props.style}, props.children || '')
  )
}

export default TypographyComponent
