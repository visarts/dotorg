import { StyledImage, StyledImageSrc } from './image.style'

const ImageComponent = props => {
  return (
    <StyledImage type={props.type}>
      {props.src &&
        <StyledImageSrc
          type={props.type}
          src={props.src}
          onError={props.loadDefaultImage}
          alt={props.alt || props.src} />
      }
    </StyledImage>
  )
}

export default ImageComponent
