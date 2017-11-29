import './primaryButton.component.scss';

const PrimaryButton = (props) => {

  return (
    <button className="primaryButton" onClick={props.action ? props.action : () => {return;}}>{props.text}</button>
  );
};

export default PrimaryButton;
