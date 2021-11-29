import React, {useState} from 'react';

import './plantCategoryList.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SimpleCarousel from './carousel_banner';
import PlantCategoryList_plantList from './plantCategoryList-plantList';


const PlantCategoryList = (props) => {
  
  

  return (
    <div className="PlantCategoryList">
      <SimpleCarousel></SimpleCarousel>
      <PlantCategoryList_plantList />      
    </div>
  );
};

export default PlantCategoryList;