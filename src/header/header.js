import React ,{useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { Avatar } from 'antd';

import './header.css';
import axios from 'axios';

const Header = (props) => {

  const [isLogin, setIsLogin] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.get("https://codingjoa.kro.kr:49000/api/v1/user/me")
      .then(res => {    
        console.log(res.data);      
        setIsLogin(true);
        setUserInfo(res.data)         
      }).catch(err => {
        console.log(err);
        setIsLogin(false); 
      })
  }, []);

  const history = useHistory() ; 

  let test = () => {
    axios.delete("https://codingjoa.kro.kr:49000/api/v1/sign").then(res => {
      history.push("/login")
    }).catch(err => {
      console.log(err);
      alert("로그아웃 실패")
    }); 
  }

  return (
    <div className="Header">
      <div className="headerBox">
        <div className="imageBox"><img alt="logo" src="/img/temp_logo3.png" onClick={() => history.push("/")}></img></div>
        <div className="profileBox">
          {isLogin && userInfo != null? 
          <>                          
            <Avatar size={40} src={userInfo.profileImg == null ? "/img/userDefaultImg.png"  : "https://codingjoa.kro.kr:49000/" + userInfo.profileImg } />
            <h5>{userInfo.name} </h5>
            <button className="logOutBtn" onClick={() => test()}>로그아웃</button>
          </> 
          : <><span onClick={() => history.push("/login")}>로그인</span><button className="sginupBtn" onClick={() => history.push("/signup")}>회원가입</button></>}
        </div>
      </div>
    </div>
  );
};

export default Header;