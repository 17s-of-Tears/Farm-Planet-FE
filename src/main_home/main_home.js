import React, { useState} from 'react';

import './main_home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainHome = (props) => {
  
  

  return (
    <div className="MainHome">
      <div className="main_bannerBox">
        <div className="imageBox"><img src='img/main_banner.png'></img></div>         
        <div className="textBox">
          <h4>애플노트북</h4>
          <p>다양한 작물을 카워보세요. 언제든 해지하실 수 있습니다.
          <br></br>농부가 될 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 전화번호를 입력하세요.</p>           
        </div>
      </div>
      <div className="mainBox"></div>
      <div className="questionBox"></ div>
    </div>
  );
};

export default MainHome;