import React, {useState} from 'react';

import './subscript.css';

const Subscript = (props) => {



  return (
    <div className="Subscript">
      <div className="membershipBox">
        <div className="itemBox">
          <div className="titleLine">
            <div className="coloredDot"></div><h2>Basic</h2>            
          </div>

          <div className="priceLine">
            <span>22000 ₩ </span>/월
          </div>

          <div className="textLine">
            <ul>
              <li>109m2</li>
              <li>3 개의 나무</li>
              <li>5 개의 작물 선택</li>
              <li>최대 5 개의 나무</li>
              <li>7 개의 작물 재배가능</li>
            </ul>
          </div>

          <div className="buttonLine">
            <button className="subscriptionBtn">구독하기</button>
          </div>

        </div>
        
        <div className="itemBox">
          <div className="titleLine">
            <div className="coloredDot"></div><h2>Basic</h2>            
          </div>

          <div className="priceLine">
            <span>33000 ₩ </span>/월
          </div>

          <div className="textLine">
            <ul>
              <li>145m2</li>
              <li>5 개의 나무</li>
              <li>7 개의 작물 선택</li>
              <li>최대 7 개의 나무</li>
              <li>10 개의 작물 재배가능</li>
            </ul>
          </div>

          <div className="buttonLine">
            <button className="subscriptionBtn">구독하기</button>
          </div>
          
        </div>

        <div className="itemBox">
          <div className="titleLine">
            <div className="coloredDot"></div><h2>Basic</h2>            
          </div>

          <div className="priceLine">
            <span>44000 ₩ </span>/월
          </div>

          <div className="textLine">
            <ul>
              <li>181m2</li>
              <li>7 개의 나무</li>
              <li>10 개의 작물 선택</li>
              <li>최대 10 개의 나무</li>
              <li>15 개의 작물 재배가능</li>
            </ul>
          </div>

          <div className="buttonLine">
            <button className="subscriptionBtn">구독하기</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Subscript;
