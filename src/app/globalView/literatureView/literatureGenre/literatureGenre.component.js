import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import dataService from 'Services/data.service';
//import historyService from 'Services/history.service';
import BackToTop from 'SharedComponents/backToTop/backToTop.component';
import ListLink from 'SharedComponents/listLink/listLink.component';
import './literatureGenre.component.less';


const LiteratureGenre = (props) => {

  

  return (
    <div className="literatureGenre">
      <h1>Genres</h1>
      <div className="genreContainer">

      </div>
    </div>
  )
};

export default LiteratureGenre;
