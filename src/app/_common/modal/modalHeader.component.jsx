import Typography from 'common/typography/typography.container'

const ModalHeader = props => {

  return (
    <div className="portitudeModal--header">
      <Typography type="title" className="nomargin">{props.title || ''}</Typography>
      <Typography type="subtitle">{props.subtitle || ''}</Typography>
    </div>
  )
}

export default ModalHeader
