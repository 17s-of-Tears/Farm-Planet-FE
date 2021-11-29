import React,{useState} from 'react';
import './login.css'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {Form, Button} from 'antd';

const Login = () => {

    const history = useHistory();

    const signIn = () => {
        history.push("/signup");
    }

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

    const submitHandler = (e) => {
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
            <label>로그인</label>
            <Form id="loginForm" method="post" onFinish={submitHandler}>
                <div class="inputStyle">
                    <input id="Id" type="text" value={id} onChange={idHandler} />
                </div>
                <div class="inputStyle">
                    <input id="password" type="password" value={password} onChange={passwordHandler} />
                </div>
                <div>
                    <button type='primary' htmlType="submit" class="loginButton" id="logineButton">로그인</button>
                    <button class="loginButtonTwo" onClick={signIn}>회원가입</button>
                </div>
            </Form>
        </div>
    )
}

export default Login;
