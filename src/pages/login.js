import React from 'react';
import './login.css'

const Login = () => {
    return(
        <div class="loginBox">
            <label>로그인</label>
            <div class="inputStyle">
                <input />
            </div>
            <div class="inputStyle">
                <input />
            </div>
            <div>
                <button class="loginButton">로그인</button> <button class="loginButtonTwo">회원가입</button>
            </div>
            <div><button class="loginButtonTwo">다른 소셜계정 로그인</button></div>
        </div>
    )
}

export default Login;