const ModalBody = props => {

  return (
    <div className={`portitudeModal--body ${props.fullHeight ? 'portitudeModal--body-full' : ''}`}>
      {props.children}
    </div>
  )
}

export default ModalBody
