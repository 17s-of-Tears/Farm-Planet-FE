import React, { useState } from 'react';
import './login.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Form } from 'antd';

const Login = () => {

    const history = useHistory();

    let [id, onChangeId] = useState('');
    let [password, onChangePassword] = useState('');

    const idHandler = (e) => {
        e.preventDefault();
        onChangeId(e.target.value);
    };

    const passwordHandler = (e) => {
        e.preventDefault();
        onChangePassword(e.target.value);
    };

    const submitHandler = () => {
        console.log(id);
        console.log(password);
        let body = {
            id: id,
            password: password,
        };
        axios
            .post("http://txshi.iptime.org:49000/api/v1/sign", body)
            .then((res) => history.push('/profile'));
    };

    return (
        <div class="loginBox">
            <label className="loginLabel">Login</label>
            <Form id="loginForm" method="post" onFinish={submitHandler}>
                <div className="inputStyle">
                    <input id="Id" type="text" value={id} onChange={idHandler} />
                </div>
                <div className="inputStyle">
                    <input id="password" type="password" value={password} onChange={passwordHandler} />
                </div>
                <div>
                    <button htmlType="submit" className="loginButton">로그인</button>
                </div>
                <div>
                    <p className="signUpMent">아직 아이디가 없으신가요? <a href="/signup">SignUp!</a></p>
                </div>
            </Form>
        </div>
    )
}

export default Login;
