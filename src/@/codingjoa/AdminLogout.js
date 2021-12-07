import { signoutAdmin } from './ajax'
import { useViewDispatch } from './hook'
import { Refresh } from './component'

function reducer(state, action) {
  if(action.type === 'pending') {
    return {
      ...state,
      type: 'pending',
    }
  }
  if(action.type === 'redirect') {
    return {
      ...state,
      type: 'redirect',
    }
  }
  return state;
}

export default function AdminLogout() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        signoutAdmin().then(
          () => dispatch({ type: 'redirect' }),
          () => dispatch({ type: 'redirect' }),
        );
      }
    },
    view(state, dispatch) {
      if(state.type === 'idle') {
        return <button onClick={() => dispatch({ type: 'pending' })}>로그아웃</button>;
      } else if(state.type === 'pending') {
        return <button disabled>로그아웃</button>;
      } else if(state.type === 'redirect') {
        return <Refresh />;
      }
      return null;
    },
    reducer,
    initialValue: {
      type: 'idle',
    },
  })

  return view;
}
