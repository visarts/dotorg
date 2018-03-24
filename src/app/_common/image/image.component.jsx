import './image.style.scss'

const ImageComponent = props => {
  console.log(props)
  return (
    <span className={`image ${props.type === 'thumbnail' ? 'image--thumbnail' : ''}`}>
      {props.src &&
        <img
          src={props.src}
          className="image-src"
          onError={props.loadDefaultImage}
          alt={props.alt || props.src} />
      }
    </span>
  )
}

export default ImageComponent
