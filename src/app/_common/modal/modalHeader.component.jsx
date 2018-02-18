const ModalHeader = (props) => {

  return (
    <div className="portitudeModal--header">
      <h1>{props.title || ''}</h1>
      <div>{props.subtitle || ''}</div>
    </div>
  )
}

export default ModalHeader
