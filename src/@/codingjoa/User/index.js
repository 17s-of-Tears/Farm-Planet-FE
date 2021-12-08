import { getUsers, updateUser } from '@/codingjoa/ajax'
import { useViewDispatch } from '@/codingjoa/hook'
import { Pagination } from 'antd';

function reducer(state, action) {
  if(action.type === 'fetched') {
    return {
      ...state,
      type: 'list',
      current: action.result._meta.page.current,
      last: action.result._meta.page.last,
      data: action.result.users,
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

function Rename({
  id,
  dispatch,
}) {
  const handleSubmit = () => {
    const name = window.prompt('변경할 닉네임 입력');
    if(name === null) {
      return;
    }
    updateUser({
      id,
      name,
    }).then(
      () => dispatch({ type: 'refresh' }),
      err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  };
  return <button onClick={handleSubmit}>부적절한 닉네임 변경</button>;
}

function UserListMain({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = (row, index) => (
    <tr key={index}>
      <td>{row.id}</td>
      <td>{row.name} <Rename id={row.id} dispatch={dispatch} /></td>
      <td>{row.accountID}</td>
      <td>{row.createdAt}</td>
    </tr>
  );

  return <div>
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
        {data.map && data.map(Row)}
      </tbody>
    </table>
    <Pagination onChange={page => dispatch({ type: 'refresh', page })} current={current} pageSize={1} total={total} />
  </div>;
}

export default function User() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getUsers({ page: state.current }).then(data => dispatch({
          type: 'fetched',
          result: data,
        }), err => 0);
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <UserListMain current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
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
