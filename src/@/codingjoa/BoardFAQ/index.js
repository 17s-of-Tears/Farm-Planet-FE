import React from 'react'
import { getBoardFAQs, getBoardFAQ } from '@/codingjoa/ajax'
import { Time } from '@/codingjoa/component/timestamp'
import { useViewDispatch } from '@/codingjoa/hook'
import Editor from './Editor'
import { Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';

function BoardFAQWrite({
  dispatch,
}) {
  return <Editor id={null} payload={{}} dispatch={dispatch} />;
}

function BoardFAQDetail({
  id,
  dispatch,
}) {
  const [ data, setData ] = React.useState(null);
  React.useLayoutEffect(() => {
    getBoardFAQ({ id }).then(
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

function BoardFAQList({
  data,
  dispatch,
  current,
  total,
}) {
  const Row = (row, index) => (
    <tr key={row.id}>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td><Time>{row.createdAt}</Time></td>
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

export default function BoardFAQ() {
  const view = useViewDispatch({
    effect(state, dispatch) {
      if(state.type === 'pending') {
        getBoardFAQs({ page: state.current }).then(
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
        return <BoardFAQList current={state.current} total={state.last} data={state.data} dispatch={dispatch} />
      }
      if(state.type === 'edit') {
        return <BoardFAQDetail id={state.id} dispatch={dispatch} />
      }
      if(state.type === 'add') {
        return <BoardFAQWrite dispatch={dispatch} />
      }
      return null;
    },
    reducer(state, action) {
      if(action.type === 'fetched') {
        return {
          ...state,
          type: 'list',
          current: action.result._meta.page.current,
          last: action.result._meta.page.last,
          data: action.result.faqs,
        }
      }
      if(action.type === 'refresh') {
        return {
          ...state,
          type: 'pending',
          data: null,
          current: action.page ?? state.current,
        }
      }
      if(action.type === 'id') {
        return {
          ...state,
          type: 'edit',
          id: action.id,
        };
      }
      if(action.type === 'add') {
        return {
          ...state,
          type: 'add',
        }
      }
      return state;
    },
    initialValue: {
      type: 'pending',
      current: 1,
      last: 1,
      data: null,
      id: null,
    }
  });
  return view;
}
