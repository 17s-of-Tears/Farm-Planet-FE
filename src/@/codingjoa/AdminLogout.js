import { signoutAdmin } from './ajax'
import { useAsyncView } from './hook'
import { Refresh } from './component'

export default function AdminLogout() {
  const [ View, state, force ] = useAsyncView((payload, callback) => {
    signoutAdmin(payload).then(() => {
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
  }, null, { autostart: false });
  return (
    <>
      <button onClick={() => force()}>로그아웃</button>
      <View>
        <Refresh />
      </View>
    </>
  );
}
