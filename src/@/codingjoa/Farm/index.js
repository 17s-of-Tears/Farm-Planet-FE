import React from 'react'
import { getFarms, getFarm } from '@/codingjoa/ajax'
import { useViewDispatch } from '@/codingjoa/hook'
import Editor from './Editor'
import { Pagination } from 'antd';

function FarmAddMain({
  dispatch
}) {
  return <Editor id={null} payload={{}} dispatch={dispatch} />;
}

function FarmDetailMain({
  id,
  dispatch,
}) {
  const [ data, setData ] = React.useState(null);
  React.useLayoutEffect(() => {
    getFarm({ id }).catch(alerter).then(data => setData(data));
  }, [ id ]);
  return (
    <>
      {data && <Editor id={id} payload={data} dispatch={dispatch} />}
    </>
  );
}

function FarmListMain({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = (row, index) => (
    <tr key={index}>
      <td>{row.id}</td>
      <td><img height="64px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`category_id${row.id}`} /></td>
      <td>{row.name}</td>
      <td>[{row.locationX},{row.locationY}]</td>
      <td><button onClick={() => dispatch({ type: 'id', id: row.id })} className="updateBtn">수정</button></td>
    </tr>
  );
  return <div className="adminFarm">
    <table className="tableStyle_1">
      <thead>
        <tr>
          <th>번호</th>
          <th>이미지</th>
          <th>밭이름</th>
          <th>좌표</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        {data.map && data.map(Row)}
        <tr>
          <td colSpan="5"><button onClick={() => dispatch({ type: 'add' })}>추가</button></td>
        </tr>
      </tbody>
    </table>
    <Pagination onChange={page => dispatch({ type: 'refresh', page })} current={current} pageSize={1} total={total} />
  </div>;
}

function reducer(state, action) {
  if(action.type === 'fetched') {
    return {
      ...state,
      type: 'list',
      current: action.result._meta.page.current,
      last: action.result._meta.page.last,
      data: action.result.farms,
    };
  }
  if(action.type === 'id') {
    return {
      ...state,
      type: 'edit',
      id: action.id,
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
  if(action.type === 'add') {
    return {
      ...state,
      type: 'add',
    }
  }
  return state;
}

function alerter(err) {
  alert(err.message);
}

export default function Farm() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getFarms({ page: state.current }).then(result => {
          dispatch({
            type: 'fetched',
            result,
          });
        }, err => 0);
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <FarmListMain current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      if(state.type === 'edit') {
        return <FarmDetailMain id={state.id} dispatch={dispatch} />
      }
      if(state.type === 'add') {
        return <FarmAddMain id={null} dispatch={dispatch} />
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
