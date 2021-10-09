import React, {useState} from 'react';
import {Container,Row,Col,Button} from 'react-bootstrap';

import './recommend_plant.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecommendPlant = (props) => {

  // url로 받을듯?
  let [plant_banner_img,setPlant_banner_img] = useState('img/temp_recommend_plant.png');
  let [plant_banner_title,setPlant_banner_title] = useState('겨울을 좋아하는 작물');
  
  return (
    <div className="RecommendPlant">      
      <div className="page_container">

        {/* 리스트 배너이미지 및 타이틀 박스 */}
        <div className="plant_banner">
          <div className="imageBox"><div className="overlay"></div><img src='img/temp_recommend_plant.png'></img></div>
          <div className="textBox">
            <h4>{plant_banner_title}</h4>
            <span>스크롤해서 만나기↓</span>
          </div>          
        </div>

        {/* 그리드형식 식물 리스트 */}
        <div className="plant_listBox">

          {/* 식물정보 */}
          <div className="plant_item">
            <div className="imageBox"><div className="overlay"></div><img src='img/temp_plant_img1.png'></img></div>
            <div className="titleBox">
              <h4>고구마</h4>
              <input type="button" className="buttonStyle_1" value="재배하기"></input>
            </div>
          </div>

          <div className="plant_item">
            <div className="imageBox"><div className="overlay"></div><img src='img/temp_plant_img2.png'></img></div>
            <div className="titleBox">
              <h4>사과</h4>
              <input type="button" className="buttonStyle_1" value="재배하기"></input>
            </div>
          </div>

          <div className="plant_item">
            <div className="imageBox"><div className="overlay"></div><img src='img/temp_plant_img3.png'></img></div>
            <div className="titleBox">
              <h4>애플노트북</h4>
              <input type="button" className="buttonStyle_1" value="재배하기"></input>
            </div>
          </div>

          <div className="plant_item">
            <div className="imageBox"><div className="overlay"></div><img src='img/temp_plant_img4.png'></img></div>
            <div className="titleBox">
              <h4>데저트2</h4>
              <input type="button" className="buttonStyle_1" value="재배하기"></input>
            </div>
          </div>

        </div>
      </div>     
    </div>
  );
};

export default RecommendPlant;
