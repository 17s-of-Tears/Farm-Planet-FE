import React from 'react'
import { getBoardNotices } from './ajax'
import { useAsyncView } from './hook'
import BoardNoticeDetail from './BoardNoticeDetail'
import BoardNoticeWrite from './BoardNoticeWrite'

function BoardNoticeList({
  setId,
}) {
  const handleClick = e => {
    e.preventDefault();
    setId(0);
  };
  const Row = (row, index) => (
    <tr>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.createdAt}</td>
      <td>{row.hit}</td>
      <td><button className="updateBtn" onClick={() => setId(row.id)}>수정</button></td>
    </tr>
  );
  const [ View, state ] = useAsyncView((payload, callback) => {
    getBoardNotices(payload).then(data => callback({
      code: 1,
      data,
    }), err => callback({
      code: -1,
      data: {
        code: err?.response?.data?.status,
        message: err?.response?.data?.message,
      },
    }));
  });
  return (
    <View>
      <div className="adminBoardNotice">
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
            {state.data?.notices?.map && state.data?.notices?.map(Row)}
          </tbody>
        </table>
        <button onClick={handleClick} className="writeBtn">새 글쓰기</button>        
      </div>
    </View>
  );
}

export default function BoardNotice() {
  const [ id, setId ] = React.useState(null);
  return (
    <>
      {id===null && <BoardNoticeList setId={setId} />}
      {id===0 && <BoardNoticeWrite setId={setId} />}
      {id>0 && <BoardNoticeDetail id={id} setId={setId} />}
    </>
  );
}
