import React from 'react'
import { getBoardNotices } from './ajax'
import { useAsyncView } from './hook'

function Row(row, index) {
  return (
    <tr>
      <td>{row.id}</td>
      <td>{row.title}</td>
      <td>{row.createdAt}</td>
      <td>{row.hit}</td>
    </tr>
  );
}

export default function BoardNotice() {
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
      <table>
        <thead>
          <tr>
            <td>번호</td>
            <td>제목</td>
            <td>작성일</td>
            <td>조회수</td>
          </tr>
        </thead>
        <tbody>
          {state.data?.notices?.map && state.data?.notices?.map(Row)}
        </tbody>
      </table>
    </View>
  );
}
