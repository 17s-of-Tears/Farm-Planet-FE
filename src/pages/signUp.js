import React from 'react';
import './signUp.css'
import { Row, Col } from 'antd';

const SignUp = () => {
    return (
        <>
            <Row>
                <Col span={9}></Col>
                <Col span={6}>
                    <div className="signUpBox">
                        <form id="signUp" method="post">
                            <label>회원가입</label>
                            <div>
                                <input type="text" placeholder="id" id="id" />
                            </div>
                            <div>
                                <input type="password" placeholder="password" id="password" />
                            </div>
                            <div>
                                <input type="email" placeholder="email" id="email" />
                            </div>
                            <div>
                                <button className="signUpButton">회원가입 하기</button>
                            </div>
                        </form>
                    </div>
                </Col>
                <Col span={9}></Col>
            </Row>
        </>

    )
}

export default SignUp;