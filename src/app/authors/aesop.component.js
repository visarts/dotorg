import React from 'react';
import './aesop.component.less';

const Aesop = (props) => {
console.log(props.match);
  return (
    <div className="authors">
      <h1>{props.match.params.author}</h1>
      <div>Anyone lived in a pretty how town with up so floating many bells down.</div>
    </div>
  );
}

export default Aesop;
