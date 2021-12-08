import React from 'react'
import { getCategories, getCategory } from '@/codingjoa/ajax'
import { useViewDispatch } from '@/codingjoa/hook'
import Editor from './Editor'
import { Pagination } from 'antd';

function reducer(state, action) {
  if(action.type === 'fetched') {
    return {
      ...state,
      type: 'list',
      current: action.result._meta.page.current,
      last: action.result._meta.page.last,
      data: action.result.categories,
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

function CategoryAddMain({
  dispatch,
}) {
  return <Editor id={null} payload={{}} dispatch={dispatch} />;
}

function CategoryDetailMain({
  id,
  dispatch,
}) {
  const [ data, setData ] = React.useState(null);
  React.useLayoutEffect(() => {
    getCategory({ id }).then(
      data => setData(data),
      err => alert(`조회 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  }, [ id ]);
  return (
    <>
      {data && <Editor id={id} payload={data} dispatch={dispatch} />}
    </>
  );
}

function CategoryListMain({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = (row, index) => (
    <tr key={index}>
      <td>{row.id}</td>
      <td><img width="128px" src={`https://codingjoa.kro.kr:49000/${row.imageUrl}`} alt={`category_id${row.id}`} /></td>
      <td>{row.name}</td>
      <td><button onClick={() => dispatch({ type: 'id', id: row.id })}>수정</button></td>
    </tr>
  );
  return <div>
    <table>
      <tr>
        <thead>
          <tr>
            <th>번호</th>
            <th>이미지</th>
            <th>분류명</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {data.map && data.map(Row)}
          <tr>
            <td colspan="4"><button onClick={() => dispatch({ type: 'add' })}>추가</button></td>
          </tr>
        </tbody>
      </tr>
    </table>
    <Pagination onChange={page => dispatch({ type: 'refresh', page })} current={current} pageSize={1} total={total} />
  </div>;
}

export default function Category() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getCategories({ page: state.current }).then(data => dispatch({
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
        return <CategoryListMain current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      if(state.type === 'edit') {
        return <CategoryDetailMain id={state.id} dispatch={dispatch} />
      }
      if(state.type === 'add') {
        return <CategoryAddMain dispatch={dispatch} />
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
