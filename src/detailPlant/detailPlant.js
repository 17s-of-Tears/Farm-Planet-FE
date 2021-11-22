import React from "react";
import './detailPlant.css';
import { Row, Col } from 'antd';


const DetailPlant = () => {

    const plant = {
        name: "고구마",
        content: "9~10월에 재배합니다. 순수 탄수화물이 가득하며 식탁위의 건강을 책임집니다. 100g당 125kcal"
    }

    return (
        <div className="wrapper">
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div className="formWrapper">
                    <form method="post">
                        <div>
                            <div class="formBox">
                                <img src='\public\temp\img\logo.png' alt='logo' />
                                <div>
                                    <img className="imgStyle" src='img/temp_plant_img1.png' alt='sweetPotato' />
                                </div>
                                <label>{plant.name}</label>
                                <div>
                                    <p className='textRoom'>
                                        {plant.content}
                                    </p>
                                </div>
                                <div>
                                    <button class="loginButton">재배하기</button>
                                </div>
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