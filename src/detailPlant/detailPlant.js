import React from "react";
import './detailPlant.css';
import { Row, Col } from 'antd';
import axios from 'axios';
import Slider from "react-slick";

const DetailPlant = () => {

    const plant = {
        id: 1,
        name: "고구마",
        content: "9~10월에 재배합니다. 순수 탄수화물이 가득하며 식탁위의 건강을 책임집니다. 100g당 125kcal"
    }

    const sendPlant = () => {
        let body = {
            id: plant.id,
            name: plant.name,
        };
        axios
            .post("http://192.168.0.63:49000/api/v1/category", body)
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
                                    <img className="imgStyle" src='img/temp_plant_img1.png' alt='sweetPotato' />
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