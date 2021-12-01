import React from "react";
import { useLocation } from 'react-router-dom';
import './detailPlant.css';
import { Row, Col } from 'antd';
import axios from 'axios';
//import Slider from "react-slick";

const DetailPlant = () => {
    const location = useLocation()

    const plantData = location.state.plantData;    

    const plant = {
        id: plantData.id,
        name: plantData.name,
        content: plantData.description,
        imgURL: "https://codingjoa.kro.kr:49000/" + plantData.imageUrl
    }

    const sendPlant = () => {
        let body = {
            id: plant.id,
            name: plant.name,
        };
        axios
            .post("https://codingjoa.kro.kr:49000/api/v1/category", body)
            .then((res) => console.log(res));
    };

    return (
        <div className="wrapper">
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="formWrapper">
                        <form method="post">
                            <div class="formBox">
                                {/* <img src='public\temp\img\logo.png' alt='logo' /> */}
                                <div>
                                    <img className="imgStyle" src={plant.imgURL} alt='sweetPotato' />
                                </div>
                                <label className="plantName">{plant.name}</label>
                                <div>
                                    <p className='textRoom'>
                                        {plant.content}
                                    </p>
                                </div>
                                <div>
                                    <button class="loginButton" onClick={sendPlant}>재배하기</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Col>
                <Col span={8}></Col>
            </Row>
        </div>
    )
}

export default DetailPlant;