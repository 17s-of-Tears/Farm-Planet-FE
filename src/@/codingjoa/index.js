import Accounts from './Accounts'
import AdminLogout from './AdminLogout'
import Banner from './Banner'
import BoardNotice from './BoardNotice'
import Category from './Category'
import Farm from './Farm'
import Plant from './Plant'
import User from './User'
import Subscribe from './Subscribe'

import BoardFAQ from './BoardFAQ'

import * as ReactRouter from 'react-router-dom'
import { getMyInfo } from './ajax'
import { useViewDispatch } from './hook'

export default function HW() {
  const history = ReactRouter.useHistory();
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.status === 'PENDING') {
        getMyInfo({}).then(
          data => dispatch({ status: 'LOGIN', result: data }),
          err => dispatch({ status: 'NOT_LOGIN' })
        );
        return;
      }
      if(state.status === 'NOT_LOGIN') {
        return history.push('/adminLoginPage');
      }
    },
    view(state, dispatch) {
      if(state.status === 'LOGIN') {
        return <>
          <BoardFAQ />
        </>
      }
      return <>...</>;
    },
    reducer(state, action) {
      if(action.status === 'LOGIN') {
        return {
          ...state,
          status: 'LOGIN',
          data: action.result,
        };
      }
      if(action.status === 'NOT_LOGIN') {
        return {
          ...state,
          status: 'NOT_LOGIN',
          data: null,
        };
      }
      return state;
    },
    initialValue: {
      status: 'PENDING',
      data: null,
    }
  });
  return view;
}

/*
  {state.data?.status === 'LOGIN' && <AdminLogout />}
  {state.data?.status === 'LOGIN' && <Accounts />}
  {state.data?.status === 'LOGIN' && <Farm />}
  {state.data?.status === 'LOGIN' && <Banner />}
  {state.data?.status === 'LOGIN' && <BoardNotice />}
  {state.data?.status === 'LOGIN' && <Category />}
  {state.data?.status === 'LOGIN' && <Plant />}
  {state.data?.status === 'LOGIN' && <User />}
  {state.data?.status === 'LOGIN' && <Subscribe />}
*/
