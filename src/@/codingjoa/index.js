import Accounts from './Accounts'
import AdminLogout from './AdminLogout'
import Banner from './Banner'
import BoardNotice from './BoardNotice'
import Category from './Category'
import Farm from './Farm'
import Plant from './Plant'
import User from './User'
import Subscribe from './Subscribe'
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
    {state.data?.status === 'LOGIN' && <AdminLogout />}
    {state.data?.status === 'LOGIN' && <Accounts />}
    {state.data?.status === 'LOGIN' && <Farm />}
    {state.data?.status === 'LOGIN' && <Banner />}
    {state.data?.status === 'LOGIN' && <BoardNotice />}
    {state.data?.status === 'LOGIN' && <Category />}
    {state.data?.status === 'LOGIN' && <Plant />}
    {state.data?.status === 'LOGIN' && <User />}
    {state.data?.status === 'LOGIN' && <Subscribe />}
  </View>);
}
