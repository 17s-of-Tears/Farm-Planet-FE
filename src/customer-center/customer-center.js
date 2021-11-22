import React, {useState} from 'react';

import './customer-center.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.css';
import { Tabs, Input, } from 'antd';
import CustomerCenter_Notice from './customer-center-notice';
import CustomerCenter_FAQ from './customer-center-FAQ.js';

const CustomerCenter = (props) => {  
  
  let [tab_isOn,setTabisOn] = useState(1); 
  
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
          
          {tab_isOn == 1 ? <CustomerCenter_Notice /> : <CustomerCenter_FAQ />}
          
        </div>
      </div>

      
    </div>
  );
};

export default CustomerCenter;