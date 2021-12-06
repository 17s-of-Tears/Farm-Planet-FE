import * as ReactRouter from 'react-router-dom'
import { getUsers, updateUser } from './ajax'
import { useAsyncView } from './hook'

function Rename({
  id,
}) {
  const history = ReactRouter.useHistory();
  const handleSubmit = () => {
    const name = window.prompt('변경할 닉네임 입력');
    if(name === null) {
      return;
    }
    updateUser({
      id,
      name,
    }).then(() => {
      history.go(0);
    }, err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`))
  };
  return <button onClick={handleSubmit}>부적절한 닉네임 변경</button>;
}

function Row(row, index) {
  return (
    <tr key={index}>
      <td>{row.id}</td>
      <td>{row.name} <Rename id={row.id} /></td>
      <td>{row.accountID}</td>
      <td>{row.createdAt}</td>
    </tr>
  );
}

export default function Users() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getUsers(payload).then(data => callback({
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
      <table className="tableStyle_1">
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>계정ID</th>
            <th>생성일</th>
          </tr>
        </thead>
        <tbody>
          {state.data?.users?.map && state.data.users.map(Row)}
        </tbody>
      </table>
    </View>
  );
}
