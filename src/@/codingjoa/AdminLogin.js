import { signAdmin } from './ajax'
export default function AdminLogin() {
  const login = () => {
    signAdmin({
      id: 'admin',
      password: '1234',
    });
  }
  return <><button onClick={login}>로그인</button></>
}
