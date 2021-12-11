import React from 'react'
import { getAccounts, postAccount, updateAccount, resetPassword } from '@/codingjoa/ajax'
import { useViewDispatch, useInputRef, useInputRefHandlar } from '@/codingjoa/hook'
import { Pagination } from 'antd';

function reducer(state, action) {
  if(action.type === 'fetched') {
    return {
      ...state,
      type: 'list',
      current: action.result._meta.page.current,
      last: action.result._meta.page.last,
      data: action.result.admins,
    };
  }
  if(action.type === 'refresh') {
    return {
      ...state,
      type: 'pending',
      data: null,
      current: action.page ?? state.current,
    };
  }
  return state;
}

function ResetPassword({
  id,
}) {
  const [ password, setPassword ] = React.useState(null);

  const handleSubmit = React.useCallback(() => {
    resetPassword({
      id,
    }).then(password => setPassword(password), err => 0);
  }, [ id ]);
  const view = React.useMemo(() => {
    if(!password) {
      return <button className="initializeBtn" onClick={handleSubmit}>비밀번호 초기화</button>;
    }
    return <>{password}</>
  }, [ password, handleSubmit ]);

  return view;
}

function Rename({
  id,
  dispatch,
}) {
  const handleSubmit = () => {
    const name = window.prompt('변경할 이름 입력');
    if(name === null) {
      return;
    }
    updateAccount({
      id,
      name,
    }).then(
      () => dispatch({ type: 'refresh' }),
      err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  };
  return <button className="renameBtn" onClick={handleSubmit}>이름 변경</button>;
}

function CreateAccount({
  dispatch,
}) {
  const name = useInputRef('');
  const accountID = useInputRef('');
  const handleSubmit = useInputRefHandlar(payload => {;
    postAccount(payload).then(data => {
      alert(`임시 비밀번호 생성 완료: [${data.password}]`);
      dispatch({ type: 'refresh' });
    }, err => alert(`추가 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  }, {
    name,
    accountID
  });
  return <>
    이름: <input ref={name} />
    Id: <input ref={accountID} /> 
    <button onClick={handleSubmit} className="submitBtn">제출</button>
  </>;
}

function AccountListMain({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = (row, index) => {
    return (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.name} <Rename id={row.id} dispatch={dispatch} /></td>
        <td>{row.accountID}</td>
        <td>{row.createdAt}</td>
        <td><ResetPassword id={row.id} /></td>
      </tr>
    );
  }

  return <div className="adminManager">
    <h3>계정 추가</h3>
      <div className="addAccountBox">
        <CreateAccount dispatch={dispatch} />
      </div>             
    
    <h3>계정 목록</h3>
    <table  className="tableStyle_1">
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>계정ID</th>
          <th>생성일</th>
          <th>임시 비밀번호</th>
        </tr>
      </thead>
      <tbody>
        {data.map && data.map(Row)}
      </tbody>
    </table>
    <Pagination onChange={page => dispatch({ type: 'refresh', page })} current={current} pageSize={1} total={total} />
  </div>;
}


export default function Accounts() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getAccounts({ page: state.current }).then(data => dispatch({
          type: 'fetched',
          result: data,
        }),err => 0);
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <AccountListMain current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      return null;
    },
    reducer,
    initialValue: {
      type: 'pending',
      current: 1,
      last: 1,
      data: null,
      id: null,
    },
  });
  return view;
}
