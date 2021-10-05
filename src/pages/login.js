import React from 'react';
import './login.css'

const Login = () => {
    return(
        <div class="loginBox">
        <label>로그인</label>
        <div class="inputStyle">
            <input type="text" placeholder="id" id="id"  />
        </div>
        <div class="inputStyle">
            <input type="password" placeholder="password" id="password"  />
        </div>
        <div class="inputStyle">
            <input type="email" placeholder="email" id="email" />
        </div>
        <div>
            <button class="loginButton">회원가입</button>
        </div>
        </div>
    )
}

export default Login;