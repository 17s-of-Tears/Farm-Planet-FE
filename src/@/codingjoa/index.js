import AdminLogin from './AdminLogin'
import AdminLogout from './AdminLogout'
import BoardNotice from './BoardNotice'
import { getMyInfo } from './ajax'
import { useAsyncView } from './hook'

export default function HW() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getMyInfo(payload).then(data => {
      callback({
        code: 1,
        data: {
          status: 'LOGIN',
          ...data,
        }
      });
    }, err => {
      callback({
        code: 1,
        data: {
          status: 'NOT_LOGIN',
        },
      });
    });
  });
  return (
  <View>
    {state.data?.status === 'NOT_LOGIN' && <AdminLogin />}
    {state.data?.status === 'LOGIN' && <AdminLogout />}
    {state.data?.status === 'LOGIN' && <BoardNotice />}
  </View>);
}
