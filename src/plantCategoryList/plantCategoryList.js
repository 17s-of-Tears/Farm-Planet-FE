import React, {useState} from 'react';

import './plantCategoryList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SimpleCarousel from './carousel_banner';
import PlantList_items from './plantList-list';


const PlantCategoryList = (props) => {
  
  

  return (
    <div className="PlantCategoryList">
      <SimpleCarousel></SimpleCarousel>
      <PlantList_items />      
    </div>
  );
};

export default PlantCategoryList;