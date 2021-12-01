import AdminLogin from './AdminLogin'
import AdminLogout from './AdminLogout'
import Banner from './Banner'
import BoardNotice from './BoardNotice'
import BoardNoticeWrite from './BoardNoticeWrite'
import BoardNoticeDetail from './BoardNoticeDetail'
import Category from './Category'
import CategoryWrite from './CategoryWrite'
import CategoryDetail from './CategoryDetail'
import Plant from './Plant'
import PlantDetail from './PlantDetail'
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
    {state.data?.status === 'LOGIN' && <Banner />}
    {state.data?.status === 'LOGIN' && <BoardNoticeWrite />}
    {state.data?.status === 'LOGIN' && <BoardNotice />}
    {state.data?.status === 'LOGIN' && <BoardNoticeDetail />}
    {state.data?.status === 'LOGIN' && <Category />}
    {state.data?.status === 'LOGIN' && <CategoryWrite />}
    {state.data?.status === 'LOGIN' && <CategoryDetail />}
    {state.data?.status === 'LOGIN' && <Plant />}
    {state.data?.status === 'LOGIN' && <PlantDetail />}
  </View>);
}
