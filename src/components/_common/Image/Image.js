import { StyledImage, StyledImageSrc } from './Image.style'

const Image = props => {

  const loadDefaultImage = event => {
    event.target.src = (this.props && this.props.default) || ''
  }

  return (
    <StyledImage type={props.type}>
      {props.src &&
        <StyledImageSrc
          type={props.type}
          src={props.src}
          onError={loadDefaultImage}
          alt={props.alt || props.src} />
      }
    </StyledImage>
  )
}

export default Image
