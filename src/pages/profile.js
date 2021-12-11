/*global kakao*/
import React, { useState, useEffect } from 'react'
import { Col, Row } from "antd";
import './profile.css';
import ProfilePhotoCard from './profilePhotoCard';
import ProfileMyFarmMap from './profileMyFarmMap';
import { useHistory } from 'react-router';
import axios from 'axios';

const Profile = () => {

    let history = useHistory();

    let [me, setMe] = useState();

    useEffect(() => {
        axios.get("https://codingjoa.kro.kr:49000/api/v1/user/me")
            .then(res => {
                setMe(res.data);
                console.log(me);
            })
            .catch(err => console.log(err))
    }, []);

    const onChange = (e) => {

    }

    const changeMynickname = () => {

    }

    const changeProfileImg = () => {
        
    }

    console.log(me);
    
    return (
        <div className="allWrapper">
            <img alt="logo" src="/img/temp_logo3.png" className="profileLogo" onClick={() => history.push("/")} />
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <div className="heightGroup">
                        <div className="setProfileImg">
                            <img className="setProfileImgContent" src={me.profileImg? me.profileImg : null} />
                            <button className="changeProfileImgButton" onClick={changeProfileImg}>벝</button>
                            <div id="name">
                                <p>{me.name? me.name : null}</p>
                            </div>
                        </div>
                        <div className="setProfile">
                            <input type="text" name="myNicknameChange" onChange={onChange} class="nicknameInput" /><button class="nicknameChangeButton" onClick={changeMynickname}>별명 변경하기</button>
                            <p>{me.date ? me.date : null}</p>
                            <p>{me.farm.yard ? me.farm.yard : null}</p>
                            <p><a href={me.imageUrl ? me.imageUrl : null}>사진보기</a></p>
                            <p>{me.farm.address ? me.farm.address : null}</p>
                            <p>{me.farm.plants ? me.farm.plants : null}</p>
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