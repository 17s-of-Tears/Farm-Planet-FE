/*global kakao*/
import React, { useEffect } from 'react'
import './myFarmLocation.css';
import { Card, Col, Row } from "antd";
import './watchMyPlant.css';

const { Meta } = Card;

const MyFarmLocation = () => {

  const { kakao } = window;

  var me = {
    name: "압구정의 자랑 이진수",
    date: "2017-01-05",
    yard: "350m",
    plantPhoto: "http://localhost:3000/myplant",
    myAddress: "압구정 4번출구 날 기다리는 그녀 이름 경은이",
    profileImg: "./logo192.png",
    farmName: "진수는 돈이 많수!",
    myPlant: ['이진수는', '왜그리', '돈이 많수'],
    myWoud: ['사과나무', '오목나무', '압구정나무', '50억나무'],
    farmLocation: [37.3595316, 127.1052133],
  }

  useEffect(() => {

    let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    let options = { //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(me.farmLocation[0], me.farmLocation[1]), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

  }, [])

  const myPlant = ["고구마", "이진수"];
  const date = ["12-06", "01-06", "02-06", "03-06", "04-06", "05-06"];
  const josef = ["김", "요", "셉", "잘", "생", "김"];

  return (
    <>
      <Row>
        <Col span={8}><p className="farmName">{me.farmName}의 위치</p></Col>
        <Col span={8}>
          <div className="coolSexyGuy">
            <div id="map" />

          </div>
        </Col>
        <Col span={8}>
          <div className="infomation">
            <div>{me.date}</div>
            <div>{me.myAddress}</div>
            <div>{me.myPlant}</div>
            <div>{me.myWoud}</div>
          </div></Col>
      </Row>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <div>
            {myPlant.map((a, i) => (
              <div className="site-card-wrapper">
                <p>{a}</p>
                <Row gutter={16}>
                  {date.map((a, i) => (
                    <Col span={4}>
                      <Card
                        hoverable
                        cover={<img alt="example"
                          src='img/temp_plant_img3.png'
                        />}
                      >
                        <Meta title={a} description={josef[i]} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
}

export default MyFarmLocation;