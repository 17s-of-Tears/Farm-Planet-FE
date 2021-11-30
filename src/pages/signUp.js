import React, { useCallback, useState } from 'react';
import * as ReactRouter from 'react-router-dom'
import './signUp.css'
import { Row, Col, Checkbox, Form } from 'antd';
import axios from "axios";

const SignUp = () => {
    const history = ReactRouter.useHistory();
    const [id, onChangeid] = useState('');
    const [nickname, onChangeNickname] = useState('');
    const [password, onChangePassword] = useState('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e)=>{
         setTerm(e.target.checked);
         setTermError(false);
    },[]);

    const idHandler = (e) => {
        e.preventDefault();
        onChangeid(e.target.value);
      };

      const nicknameHandler = (e) => {
        e.preventDefault();
        onChangeNickname(e.target.value);
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
        axios({
          method: 'GET',
          url: 'http://txshi.iptime.org:49000/api/v1/sign/up',
          data: body,
          withCredentials: true,
        }).then((res) => history.push('/profile'));
      };

    return (
        <>
            <Row>
                <Col span={9}></Col>
                <Col span={6}>
                    <div className="signUpBox">
                        <Form id="signUp" method="post" onFinish={submitHandler}>
                            <label>회원가입</label>
                            <div>
                                <input type="text" placeholder="id" name="user-id" value={id} onChange={idHandler} />
                            </div>

                            <label htmlFor='user-nick'>닉네임</label>
                            <div>
                                <input name="user-nick" placeholder="nickname" value={nickname} required onChange={nicknameHandler} />
                            </div>
                            <div>
                                <input type="password" placeholder="password" id="user-password" value={password} onChange={passwordHandler} />
                            </div>
                            <div>
                                <input
                                    placeholder="password-check"
                                    name="user-password-check"
                                    type="password"
                                    value={passwordCheck}
                                    required
                                    onChange={onChangePasswordCheck} />
                                {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
                            </div>
                            <div>
                                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>동의합니다</Checkbox>
                                {termError && <div>약관에 동의하셔야 합니다</div>}
                            </div>
                            <div>
                                <button className="signUpButton">회원가입 하기</button>
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col span={9}></Col>
            </Row>
        </>

    )
}

export default SignUp;
