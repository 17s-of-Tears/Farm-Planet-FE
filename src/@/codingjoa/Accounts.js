import React from 'react'
import * as ReactRouter from 'react-router-dom'
import { getAccounts, postAccount, updateAccount, resetPassword } from './ajax'
import { useAsyncView, useInputRef, useInputRefHandlar } from './hook'

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
        return <button onClick={handleSubmit}>비밀번호 초기화</button>;
    }
    return <>{password}</>
  }, [ password, handleSubmit ]);

  return view;
}

function Rename({
  id,
}) {
  const history = ReactRouter.useHistory();
  const handleSubmit = () => {
    const name = window.prompt('변경할 이름 입력');
    if(name === null) {
      return;
    }
    updateAccount({
      id,
      name,
    }).then(() => {
      history.go(0);
    }, err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`))
  };
  return <button onClick={handleSubmit}>이름 변경</button>;
}

function CreateAccount() {
  const history = ReactRouter.useHistory();
  const name = useInputRef('');
  const accountID = useInputRef('');
  const handleSubmit = useInputRefHandlar(payload => {;
    postAccount(payload).then(data => {
      alert(`임시 비밀번호 생성 완료: [${data.password}]`);
      history.go(0);
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

function Row(row, index) {
  return (
    <tr key={index}>
      <td>{row.id}</td>
      <td>{row.name} <Rename id={row.id} /></td>
      <td>{row.accountID}</td>
      <td>{row.createdAt}</td>
      <td><ResetPassword id={row.id} /></td>
    </tr>
  );
}

export default function Accounts() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getAccounts(payload).then(data => callback({
      code: 1,
      data,
    }), err => callback({
      code: -1,
      data: {
        code: err?.response?.data?.status,
        message: err?.response?.data?.message,
      },
    }))
  });
  return (
    <View>
      <h2>계정 추가</h2>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <CreateAccount />
        </tbody>
      </table>
      <h2>계정 목록</h2>
      <table>
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
          {state.data?.admins?.map && state.data.admins.map(Row)}
        </tbody>
      </table>
    </View>
  );
}
