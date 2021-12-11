import React from 'react'
import { getBoardNotices, getBoardNotice } from '@/codingjoa/ajax'
import { useViewDispatch } from '@/codingjoa/hook'
import Editor from './Editor'
import { Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function BoardNoticeWrite({
  dispatch,
}) {
  return <Editor id={null} payload={{}} dispatch={dispatch} />;
}

function BoardNoticeDetail({
  id,
  dispatch,
}) {
  const [ data, setData ] = React.useState(null);
  React.useLayoutEffect(() => {
    getBoardNotice({ id }).then(
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

function BoardNoticeList({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = (row, index) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.createdAt}</td>
      <td>{row.hit}</td>
      <td><button className="updateBtn" onClick={() => dispatch({ type: 'id', id: row.id })}>수정</button></td>
    </tr>
  );

  return <div className="adminBoardNotice">
    <table className="tableStyle_1">

      <thead>
        <tr>
          <td>번호</td>
          <td>제목</td>
          <td>작성일</td>
          <td>조회수</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {data.map && data.map(Row)}
      </tbody>
    </table>
    
    <div className="btnLine">
      <button className="writeBtn" onClick={() => dispatch({ type: 'add' })}><EditOutlined />작성</button>
    </div>
    
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
      data: action.result.notices,
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

export default function BoardNotice() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getBoardNotices({ page: state.current }).then(
          data => dispatch({
            type: 'fetched',
            result: data,
          }),
          err => console.error(err)
        );
      }
    },
    view(state, dispatch) {
      if(state.type === 'pending') {
        return <>...</>;
      }
      if(state.type === 'list') {
        return <BoardNoticeList current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      if(state.type === 'edit') {
        return <BoardNoticeDetail id={state.id} dispatch={dispatch} />
      }
      if(state.type === 'add') {
        return <BoardNoticeWrite dispatch={dispatch} />
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
    }
  });
  return view;
  /*
  return (
    <>
      {id===0 && <BoardNoticeWrite setId={setId} />}
      {id>0 && <BoardNoticeDetail id={id} setId={setId} />}
    </>
  );
  */
}
