import './globalFooter.component.scss';

const GlobalFooter = (props) => {
  return (
    <div className="globalFooter">
      <div className="globalContainer">
        <div className="copyright">{decodeURIComponent('%C2%A9')} 2017 Portitude.com</div>
      </div>
    </div>
  );
};

export default GlobalFooter;
