import './primaryButton.component.less';

const PrimaryButton = (props) => {

  return (
    <button className="primaryButton" onClick={props.action ? props.action : () => {return;}}>{props.text}</button>
  );
};

export default PrimaryButton;
