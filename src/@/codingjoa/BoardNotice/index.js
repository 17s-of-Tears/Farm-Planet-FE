import React from 'react'
import { getBoardNotices, getBoardNotice } from '@/codingjoa/ajax'
import { useViewDispatch } from '@/codingjoa/hook'
import Editor from './Editor'

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
  dispatch
}) {
  const Row = (row, index) => (
    <tr>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.createdAt}</td>
      <td>{row.hit}</td>
      <td><button onClick={() => dispatch({ type: 'id', id: row.id })}>수정</button></td>
    </tr>
  );

  return <table>
    <thead>
      <tr>
        <td>번호</td>
        <td>제목</td>
        <td>작성일</td>
        <td>조회수</td>
      </tr>
    </thead>
    <tbody>
      {data.map && data.map(Row)}
      <tr>
        <td><button onClick={() => dispatch({ type: 'add' })}>작성</button></td>
      </tr>
    </tbody>
  </table>;
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
  if(action.type === 'page') {
    return {
      ...state,
      type: 'list',
      current: action.page,
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
        getBoardNotices({}).then(
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
        return <BoardNoticeList data={state.data} dispatch={dispatch} />
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
