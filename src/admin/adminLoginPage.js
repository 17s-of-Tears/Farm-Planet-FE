import { Form, Input, Button } from 'antd';
import './adminLogin.css'
import login from '@/codingjoa/AdminLogin'
import { useHistory } from 'react-router-dom';

// import AdminLogin from '@/codingjoa/AdminLogin';

const AdminLoginPage = () => {
  const history = useHistory();
  const onFinish = async (values) => {
    const success = await login(values.id, values.password);
    alert(`성공 여부: ${success}`);

    if(success){
      history.push('/admin');
    }else{
      alert(`로그인 실패`);
    }
 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="AdminLoginPage">
      <div className="imageBox"><img alt="logo" src="/img/temp_logo4.png"></img></div>
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="아이디"
          name="id"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 20,
          }}
        >
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminLoginPage;
