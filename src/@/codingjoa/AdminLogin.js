import { signAdmin } from './ajax'
import { useAsyncView } from './hook'
import { Refresh } from './component'

export default function AdminLogin(props) {
  const [ View, state, force ] = useAsyncView((payload, callback) => {
    signAdmin(payload).then(() => {
      callback({
        code: 1,
      });
    }, err => {
      callback({
        code: -1,
        data: {
          code: err?.response?.status,
          message: err?.response?.data?.message,
        },
      });
    });
  }, {
    id: 'admin',
    password: '1234',
  }, { autostart: false });
  return (
    <>
      <button onClick={() => force()}>로그인</button>
      <View>
        <Refresh />
      </View>
    </>
  );
}
