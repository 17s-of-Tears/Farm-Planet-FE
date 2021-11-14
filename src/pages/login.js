import React from 'react';
import './login.css'
import { useHistory } from "react-router-dom";



const Login = () => {

    const history = useHistory();

    const signIn = () => {
        history.push("/signup");
    }

    return (
        <div class="loginBox">
            <label>로그인</label>
            <form id="loginForm" method="post">
                <div class="inputStyle">
                    <input id="Id" type="text" />
                </div>
                <div class="inputStyle">
                    <input id="password" type="password" />
                </div>
                <div>
                    <button class="loginButton" id="logineButton">로그인</button>
                    <button class="loginButtonTwo" onClick={signIn}>회원가입</button>
                </div>
                <div>
                    <button class="loginButtonTwo" id="outhButton">다른 소셜계정 로그인</button>
                </div>
            </form>
        </div>
    )
}

export default Login;