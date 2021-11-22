import React, {useState} from 'react';

import './customer-center.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.css';
import { Tabs, Input, Pagination } from 'antd';

const CustomerCenter = (props) => {  
  let [currentPage,setCurrentPage] = useState(1); 
  let [tab_isOn,setTabisOn] = useState(1); 
  
  //페이지 네이션 관련 함수
  const onChangePage = page => {
    
    console.log(page);
    setCurrentPage(page);
  };

  const { TabPane } = Tabs;
  const { Search } = Input;

  //검색 관련 함수
  const onSearch = value => {console.log(value);}
  // const onSearch = function(value, event){
  //   console.log(value);
  // }
  function callback(key) {
    console.log(key);
  }
  const onClickTab = () => {
    setTabisOn(tab_isOn == 1 ? 2 : 1)
  }  

  return (
    <div className="CustomerCenter">     
      <div className="bannerBox">
        <div className="imageBox"><img src='img/notice_banner.png' alt="notice_banner"></img></div>         
        
        <div className="textBox">
          <h1>팜 플래닛</h1>
          <p>서비스 이용관련 문의사항을 해결해 드립니다.</p>
        </div>
       
      </div>
      <div className="board_contaionr">
        <div className="tabs">        
          <div className={"tabs-tab" + (tab_isOn == 1 ? " tabs-tab-active" : "" )} onClick={onClickTab}>공지사항</div>
          <div className={"tabs-tab" + (tab_isOn == 2 ? " tabs-tab-active" : "" )} onClick={onClickTab}>FAQ</div>        
        </div>

        <div className="list_containor">
          <div className="title_line">
            <h3>전체</h3>
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 300 }}/>
          </div>
          
          <div className="list_content">
            <div className="list_item">
              <h4>농림식품부 정책 변경에 따른 서비스 이용약관 변경 </h4>
              <p>2021-11-06</p>
            </div>

            <div className="list_item">
              <h4>업데이트 공지</h4>
              <p>2021-11-06</p>
            </div>
            
            <div className="list_item">
              <h4>업데이트 공지</h4>
              <p>2021-11-06</p>
            </div>
          </div>
        </div>
      </div>

      <Pagination current={currentPage} total={100} onChange={onChangePage}/>
    </div>
  );
};

export default CustomerCenter;