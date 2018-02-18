import './globalFooter.style.scss'

const GlobalFooterComponent = (props) => {
  return (
    <div className="globalFooter">
      <div className="globalContainer">
        <div className="copyright">{decodeURIComponent('%C2%A9')} 2004-2018 Portitude</div>
      </div>
    </div>
  )
}

export default GlobalFooterComponent
