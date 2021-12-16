import Header from 'header/header';
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import './subscript.css';
import { useHistory } from 'react-router-dom';
import { Input, Button, Modal} from 'antd';

const Subscript = (props) => {
  const inputFarmName= useRef(null);

  let history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [me, setMe] = useState(null);

  useEffect(() => {
    if(me === null) {
      axios.get("https://codingjoa.kro.kr:49000/api/v1/user/me")
        .then(res => {
          setMe(res.data);
          console.log(me);

          if(res.data.farm != null){
            alert("이미 구독하셨습니다");
            history.push("/list");
          }
        })
        .catch(err => {
          setMe(false);
          console.log(err)
        });
    } else if(me === false) {
      alert("로그인 없이는 접근 할 수 없어요!");
      history.push("/login");
    }
    
  }, [ me ]);

  const [subscribeTier, setSubscribeTier] = useState(null);
  
  const showModal = (num) => {
    setSubscribeTier(num);         
    setIsModalVisible(true);
  };

  const handleOk = () => {
    var farmName = inputFarmName.current.state.value; 
    handleSubscribe(farmName,subscribeTier);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let handleSubscribe = (farmName,level) => {
    axios.post("https://codingjoa.kro.kr:49000/api/v1/subscribe",{farmName:farmName,level:level}).then(()=>{
      history.push("/list");
    })
  }

  return (    
    <div className="Subscript">
      <div className='SubscriptModal'>
      <Modal 
        title="구독신청" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <>
            <Button type="back" onClick={handleCancel}>취소</Button>
            <Button type="primary" onClick={handleOk}>제출</Button>
          </>          
        ]}
      >

        {/* 모달 본문 */}
        <p><span>
          {subscribeTier === 1 && "Basic"}
          {subscribeTier === 2 && "Standard"}
          {subscribeTier === 3 && "Premier"}</span>
          &nbsp;을 선택하셨습니다.
        </p>
        <div className='inputBox'>
        <h6>밭 이름을 지정해주세요.</h6>
          이름 : <Input style={{ width: '80%' } } ref={inputFarmName} required />             
        </div>      
      
        <p>밭은 재배하실 식물을 모두 선택후 신청하시면 알맞게 지정해드립니다</p>
        
      </Modal>
    </div>
      <Header />
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
            <button className="subscriptionBtn" onClick={()=>showModal(1)}>구독하기</button>
          </div>

        </div>
        
        <div className="itemBox">
          <div className="titleLine">
            <div className="coloredDot"></div><h2>Standard</h2>            
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
            <button className="subscriptionBtn" onClick={()=>showModal(2)} >구독하기</button>
          </div>
          
        </div>

        <div className="itemBox">
          <div className="titleLine">
            <div className="coloredDot"></div><h2>Premier</h2>            
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
            <button className="subscriptionBtn" onClick={()=>showModal(3)}>구독하기</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Subscript;
