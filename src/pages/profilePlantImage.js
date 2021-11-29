/*global kakao*/
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from "antd";
import './profile.css';
import { Route, Switch, Link } from 'react-router-dom';

const { Meta } = Card;

const ProfileMyPlantImage = () => {

    const { kakao } = window;
    var me = {
        name: "압구정의 자랑 이진수",
        date: "2017-01-05",
        yard: "350m",
        plantPhoto: "http://localhost:3000/myplant",
        myAddress: "압구정 4번출구 날 기다리는 그녀 이름 경은이",
        profileImg: "img/profile.jpg",
        farmName: "진수는 돈이 많수",
        myPlant: ['이진수는', '왜그리', '돈이 많수'],
        myWoud: ['사과나무', '오목나무', '압구정나무', '50억나무'],
        farmLocation: [37.3595316, 127.1052133],
    };
    let [myNickname, changeNickname] = useState(me.name);
    let [myProfileImg, changeMyProfileImg] = useState(me.profileImg);
    let ChangeName;

    const onChange = (e) => {
        console.log(e.target.value);
        ChangeName = e.target.value;
        return ChangeName;
    }

    const changeMynickname = () => {
        changeNickname(ChangeName);
        console.log(myNickname);
        console.log(ChangeName);
    }

    const changeProfileImg = () => {
        changeMyProfileImg("img/temp_main_content_img1.png");
    }

    useEffect(() => {

        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(me.farmLocation[0], me.farmLocation[1]), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    }, []);

    const myPlant = ["고구마", "이진수"];
    const date = ["12-06", "01-06", "02-06", "03-06", "04-06", "05-06"];
    const josef = ["김", "요", "셉", "잘", "생", "김"];

    return (
        <div className="allWrapper">
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="heightGroup">
                        <div className="setProfileImg">
                            <img className="setProfileImgContent" src={myProfileImg} /><button className="changeProfileImgButton" onClick={changeProfileImg}>벝</button>
                            <div id="name">
                                <p>{myNickname}</p>
                            </div>
                        </div>
                        <div className="setProfile">
                            <input type="text" name="myNicknameChange" onChange={onChange} /><button onClick={changeMynickname}>별명 변경하기</button>
                            <p>{me.date}</p>
                            <p>{me.yard}</p>
                            <p><a href={me.plantPhoto}>사진보기</a></p>
                            <p>{me.myAddress}</p>
                            <p>구독 해지</p>
                        </div>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Row>
                <Col span={24}>
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
            </Row>
        </div>
    );

}


export default ProfileMyPlantImage;


