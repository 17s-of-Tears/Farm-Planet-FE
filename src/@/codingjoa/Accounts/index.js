import React from 'react'
import { getAccounts, postAccount, updateAccount, resetPassword } from '@/codingjoa/ajax'
import { useViewDispatch, useInputRef, useInputRefHandlar } from '@/codingjoa/hook'


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
  if(action.type === 'page') {
    return {
      ...state,
      type: 'list',
      current: action.page,
    };
  }
  if(action.type === 'refresh') {
    return {
      ...state,
      type: 'pending',
      data: null,
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
  return <tr>
    <td>
      <input ref={name} />
    </td>
    <td>
      <input ref={accountID} />
    </td>
    <td>
      <button onClick={handleSubmit}>제출</button>
    </td>
  </tr>;
}

function AccountListMain({
  data,
  dispatch,
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
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>ID</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        <CreateAccount dispatch={dispatch} />
      </tbody>
    </table>
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
  </div>;
}


export default function Accounts() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getAccounts().catch(err => 0).then(data => dispatch({
          type: 'fetched',
          result: data,
        }));
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <AccountListMain data={state.data} dispatch={dispatch} />
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
