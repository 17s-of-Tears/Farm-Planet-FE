import React, {useState} from 'react';

import './plantList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SimpleCarousel from './carousel_banner';
const PlantList = (props) => {
  
  

  return (
    <div className="PlantList">

      <SimpleCarousel></SimpleCarousel>
      <div className="tagListBox">
        <div className="listItem">
          {/* 타이틀라인 */}
          <div className="titleLine"><h3>#테스트 식물리스트</h3><span>&gt;</span></div>
          
          {/* 그리드형식의 리스트 */}
          <div className="list_gridBox">
            <div className="imageBox"><img src='img/temp_plant_img1.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img2.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img3.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img4.png'></img></div>
          </div>
        </div>
      
        <div className="listItem">
          {/* 타이틀라인 */}
          <div className="titleLine"><h3>#테스트 식물리스트</h3><span>&gt;</span></div>
          
          {/* 그리드형식의 리스트 */}
          <div className="list_gridBox">
            <div className="imageBox"><img src='img/temp_plant_img1.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img2.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img3.png'></img></div>
            <div className="imageBox"><img src='img/temp_plant_img4.png'></img></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlantList;