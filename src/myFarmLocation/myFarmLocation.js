/*global kakao*/ 
import React, { useEffect } from 'react'
import './myFarmLocation.css';

const MyFarmLocation = () => {

    const { kakao } = window;

    useEffect(() => {

        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(37.450701, 127.570667), //지도의 중심좌표.
          level: 3 //지도의 레벨(확대, 축소 정도)
        };
    
        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    
      }, [])
    
      return (
        <div className="coolSexyGuy">
          <div id="map"/>
          <div className="infomation">
            <div>구독정보</div>
            <div>주소</div>
            <div>재배중인 작물</div>
            <div>재배중인 나무</div>
          </div>
        </div>
      );

}

export default MyFarmLocation;