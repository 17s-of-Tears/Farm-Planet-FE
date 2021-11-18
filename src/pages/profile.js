import React, { useState } from "react";
import "./profile.css"
import { Row, Col } from 'antd';

const Profile = () => {
    var me = {
        name: "압구정의 자랑 이진수",
        date: "2017-01-05",
        yard: "350m",
        plantPhoto: "http://localhost:3000/myplant",
        myAddress: "압구정 4번출구 날 기다리는 그녀 이름 경은이",
        profileImg: "./logo192.png",
        farmName: "진수는 돈이 많수",
        myPlant: ['이진수는', '왜그리', '돈이 많수'],
        myWoud: ['사과나무', '오목나무', '압구정나무', '50억나무'],
    }
    let [myNickname, changeNickname] = useState(me.name);

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

    return (
        <div className="allWrapper">
            <Row>
                <Col span={7}></Col>
                <Col span={10}>
                    <div className="heightGroup">
                        <div className="setProfileImg">
                            <img className="setProfileImgContent" src={me.profileImg} />
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
                <Col span={7}></Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="underGroup">
                        <div className="farm">{me.farmName}</div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default Profile;


