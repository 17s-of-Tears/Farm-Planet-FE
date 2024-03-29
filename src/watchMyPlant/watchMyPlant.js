import React from "react";
import { Card, Col, Row } from "antd";
import './watchMyPlant.css';
import Slider from '@ant-design/react-slick';

const { Meta } = Card;

const WatchMmyPlant = () => {
    const myPlant = ["고구마", "이진수"];
    const date = ["12-06", "01-06", "02-06", "03-06", "04-06", "05-06"];
    const josef = ["김", "요", "셉", "잘", "생", "김"]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div>
                    <Slider {...settings}>
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
                    </Slider>
                </div>
            </Col>
            <Col span={4}></Col>
        </Row>

    )
}


export default WatchMmyPlant;