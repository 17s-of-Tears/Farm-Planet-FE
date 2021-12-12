/*global kakao*/
import React, { useState, useEffect } from 'react'
import { Col, Row } from "antd";
import './profile.css';
import ProfilePhotoCard from './profilePhotoCard';
import ProfileMyFarmMap from './profileMyFarmMap';
import { useHistory } from 'react-router';
import axios from 'axios';

const Profile = () => {
    let [me, setMe] = useState(null);
    useEffect(() => {
        axios.get("https://codingjoa.kro.kr:49000/api/v1/user/me")
            .then(res => {
                setMe(res.data);
                console.log(me);
            })
            .catch(err => console.log(err))
    }, []);
    return (
        <>{me && <MyProfile me={me} />}</>
    );
};

function MyProfile(props) {

    let history = useHistory();
    let [name, setName] = useState(props.me.name);
    let [afterName, setAfterName] = useState('');
    let date = props.me.date;
    let defaultImg = "./img/userDefaultImg.png"
    const onChange = (e) => {
        setAfterName(e.target.value);
    }

    const changeMynickname = () => {

        if (afterName == name) {

            alert('같은 이름으로는 변경 할 수 없습니다');

        } else if (afterName === '') {

            alert('공백으로는 변경 할 수 없습니다');

        } else {

            setName(afterName);
            let body = {
                name: afterName,
            }
            axios({
                method: 'PUT',
                url: 'https://codingjoa.kro.kr:49000/api/v1/user/me',
                data: body,
                withCredentials: true,
            }
            )
        }
    }

    const changeProfileImg = () => {

    }

    const logout = () => {
        axios({
            method: 'DELETE',
            url: 'https://codingjoa.kro.kr:49000/api/v1/sign',
        });
        history.push("/")
    }

    console.log(props);
    console.log(props.me.name);


    return (
        <div className="allWrapper">
            <img alt="logo" src="/img/temp_logo3.png" className="profileLogo" onClick={() => history.push("/")} />
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <div className="heightGroup">
                        <div className="setProfileImg">
                            <img className="setProfileImgContent" src={props.me.profileImg ? props.me.profileImg : defaultImg} />
                            <button className="changeProfileImgButton" onClick={changeProfileImg}>벝</button>
                            <div id="name">
                                <p>{props.me.name ? name : null}</p>
                            </div>
                        </div>
                        <div className="setProfile">
                            <input type="text" name="myNicknameChange" onChange={onChange} class="nicknameInput" />
                            <button class="nicknameChangeButton" onClick={changeMynickname}>별명 변경하기</button>
                            <p>{props.me.date ? date.substr(0, 10) + '부터 구독중이예요!' : null}</p>
                            <p>{props.me.farm ? props.me.farm.yard : '아직 정보가 없어요 :('}</p>
                            <p>{props.me.farm ? props.me.farm.address : '아직 정보가 없어요 :('}</p>
                            <p>{props.me.farm ? props.me.farm.plants : '아직 정보가 없어요 :('}</p>
                            <p>구독 변경</p>
                            <p>구독 해지</p>
                        </div>
                    </div>
                </Col>
                <Col span={4}></Col>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <ProfileMyFarmMap myLocation={props.me.farm ? props.me.farm.address : [37.3595316, 127.1052133]} />
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
            <button className="logoutBtn" onClick={logout}> 로그아웃 </button>
        </div>
    );
}
export default Profile;