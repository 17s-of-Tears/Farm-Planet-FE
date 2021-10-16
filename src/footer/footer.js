import React, {useState} from 'react';

import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = (props) => {
  
  return (
    <div className="Footer">
      <div className="information_box">

        <div className="item">
          <span>상호</span> (주)팜플래닛  <span>대표자명</span> 오일남<br></br>
          <span>사업자등록번호</span> 000-00-00000 <span>통신판매업신고번호</span> 제0000-성남-0000호<br></br>
          <span>연락처</span> 00-000-0000  <span>팩스</span> 000-0000-0000  <span>이메일</span> byg@carehome.com<br></br>
          <span>주소</span> 경기도 성남시 수정구 단대동 산성대로437번길 7  지하주차장
        </div>

        <div className="item">
          <ul className="secondUl_2">
            <li>이용약관</li>
            <li><a>개인정보처리방침</a></li>
          </ul>
        </div>

        <div className="item">
            <img src="img/facebook.png" alt="" ></img>
            <img src="img/instagram.png" alt="" ></img>
            <img src="img/blog.png" alt="" ></img>
        </div>
      </div>
    </div>
  );
};

export default Footer;