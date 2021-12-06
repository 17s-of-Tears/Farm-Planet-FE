/*global kakao*/
import React, { useState, useEffect } from 'react'
import { Col, Row } from "antd";
import './profile.css';
import ProfilePhotoCard from './profilePhotoCard';
import ProfileMyFarmMap from './profileMyFarmMap';
import { useHistory } from 'react-router';

const Profile = (props) => {

    let history = useHistory();
    
    useEffect(() => {
        if(!props.me){
            history.push('/')
          }
        });

    // var me = {
    //     name: "압구정의 자랑 이진수",
    //     date: "2017-01-05",
    //     yard: "350m",
    //     plantPhoto: "http://localhost:3000/myplant",
    //     myAddress: "압구정 4번출구 날 기다리는 그녀 이름 경은이",
    //     profileImg: "img/profile.jpg",
    //     farmName: "진수는 돈이 많수",
    //     myPlant: ['이진수는', '왜그리', '돈이 많수'],
    //     myWoud: ['사과나무', '오목나무', '압구정나무', '50억나무'],
    //     farmLocation: [37.3595316, 127.1052133],
    // };


    let [myNickname, changeNickname] = useState(props.me.name);
    let [myProfileImg, changeMyProfileImg] = useState(props.me.profileImg);
    let ChangeName;
    console.log(props)
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

    return (
        <div className="allWrapper">
            <img alt="logo" src="/img/temp_logo3.png" className="profileLogo" onClick={() => history.push("/")} />
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <div className="heightGroup">
                        <div className="setProfileImg">
                            <img className="setProfileImgContent" src={props.me.profileImg} /><button className="changeProfileImgButton" onClick={changeProfileImg}>벝</button>
                            <div id="name">
                                <p>{props.me.name}</p>
                            </div>
                        </div>
                        <div className="setProfile">
                            <input type="text" name="myNicknameChange" onChange={onChange} class="nicknameInput" /><button class="nicknameChangeButton" onClick={changeMynickname}>별명 변경하기</button>
                            <p>{props.me.date}</p>
                            <p>{props.me.farm.yard}</p>
                            <p><a href={props.me.imageUrl}>사진보기</a></p>
                            <p>{props.me.farm.Address}</p>
                            <p>{props.me.farm.Plants}</p>
                            <p>구독 해지</p>
                        </div>
                    </div>
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <ProfileMyFarmMap />
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <ProfilePhotoCard />
                </Col>
                <Col span={4}></Col>
            </Row>
        </div>
    );
};

export default Profile;