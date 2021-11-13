import React, {useState} from 'react';

import './notice.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'antd/dist/antd.css';
import { Tabs } from 'antd';

const Notice = (props) => {
  
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="Notice">     
      <div></div>

      <Tabs onChange={callback} type="card">
        <TabPane tab="공지사항" key="1">
          <div className="list_containor">
            <h3>전체</h3>
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
        </TabPane>
        <TabPane tab="FAQ" key="2">            
          b
        </TabPane>

      </Tabs>
    </div>
  );
};

export default Notice;