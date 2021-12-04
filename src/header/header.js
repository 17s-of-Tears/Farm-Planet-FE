import React from 'react';
import { useHistory } from 'react-router';

import './header.css';

const Header = (props) => {
  const history = useHistory() ; 
  return (
    <div className="Header">
      <div className="headerBox">
        <div className="imageBox"><img alt="logo" src="/img/temp_logo3.png" onClick={() => history.push("/")}></img></div>
        <div className="profileBox">
          {/* {if(세션여부에따라 정보가 바뀜)} */}
          <span onClick={() => history.push("/login")}>로그인</span>
          <button className="sginupBtn" onClick={() => history.push("/signup")}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Header;