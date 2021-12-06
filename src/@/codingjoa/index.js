import Accounts from './Accounts'
import AdminLogout from './AdminLogout'
import Banner from './Banner'
import BoardNotice from './BoardNotice'
import Category from './Category'
import CategoryWrite from './CategoryWrite'
import CategoryDetail from './CategoryDetail'
import Farm from './Farm'
import FarmEditor from './FarmEditor'
import Plant from './Plant'
import User from './User'
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
    {state.data?.status === 'LOGIN' && <FarmEditor id={4} />}
    {state.data?.status === 'LOGIN' && <Banner />}
    {state.data?.status === 'LOGIN' && <BoardNotice />}
    {state.data?.status === 'LOGIN' && <Category />}
    {state.data?.status === 'LOGIN' && <CategoryWrite />}
    {state.data?.status === 'LOGIN' && <CategoryDetail />}
    {state.data?.status === 'LOGIN' && <Plant />}
    {state.data?.status === 'LOGIN' && <User />}
  </View>);
}
