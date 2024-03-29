import React from 'react'
import { getPlants, getPlant } from '@/codingjoa/ajax'
import { useViewDispatch } from '@/codingjoa/hook'
import Editor from './Editor'
import { Pagination } from 'antd';

function PlantAddMain({
  dispatch,
}) {
  return <Editor id={null} payload={{}} dispatch={dispatch} />
}

function PlantDetailMain({
  id,
  dispatch,
}) {
  const [ data, setData ] = React.useState(null);
  React.useLayoutEffect(() => {
    getPlant({ id }).then(
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

function PlantListMain({
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
      <td>{row.description}</td>
      <td>{row.categoryName}</td>
      <td><button className="updateBtn" onClick={() => dispatch({ type: 'id', id: row.id })}>수정</button></td>
    </tr>
  );

  return <div className="adminPlantList">
    <table className="tableStyle_1">
      <thead>
        <tr>
          <th>번호</th>
          <th>이미지</th>
          <th>작물명</th>
          <th>설명</th>
          <th>분류명</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        {data.map && data.map(Row)}
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
      data: action.result.plants,
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

export default function Plant() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getPlants({ page: state.current }).catch(err => 0).then(data => dispatch({
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
        return <PlantListMain current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      if(state.type === 'edit') {
        return <PlantDetailMain id={state.id} dispatch={dispatch} />
      }
      if(state.type === 'add') {
        return <PlantAddMain dispatch={dispatch} />
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
