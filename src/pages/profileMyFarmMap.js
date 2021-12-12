/*global kakao*/
import React, { useEffect } from 'react'
import { Col, Row } from "antd";
import './profile.css';

const ProfileMyFarmMap = (props) => {

    const { kakao } = window;
    var me = {
    };

    useEffect(() => {

        let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(props.myLocation[0], props.myLocation[1]), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    }, []);


    return (
        <div className="allWrapper">
                <Row>
                    <Col span={24}>
                        <div className="coolSexyGuy">
                            <div id="map" />
                        </div>
                        <br />
                        <p className="farmName">{me.farmName}의 위치</p>
                    </Col>
                </Row>
        </div>
    );
};

export default ProfileMyFarmMap;