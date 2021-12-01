import * as ReactRouter from 'react-router-dom'
import { getBoardNotice, updateBoardNotice, deleteBoardNotice } from './ajax'
import { useAsyncView, useInputRef, useInputRefHandlar } from './hook'

function Detail({
  id,
  title,
  content,
}) {
  const history = ReactRouter.useHistory();
  const titleref = useInputRef(title);
  const contentref = useInputRef(content);
  const handleSubmit = useInputRefHandlar(payload => {
    updateBoardNotice({
      ...payload,
      id,
    }).then(() => history.go(0), err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  }, {
    title: titleref,
    content: contentref,
  });
  const handleDelete = () => {
    deleteBoardNotice({
      id,
    }).then(() => history.go(0), err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`));
  };
  return (
    <div>
      <input ref={titleref}></input><br />
      <input ref={contentref}></input><br />
      <button onClick={handleSubmit}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default function BoardNoticeDetail() {
  const [ View, state ] = useAsyncView((payload, callback) => {
    getBoardNotice(payload).then(data => {
      callback({
        code: 1,
        data,
      });
    }, err => {
      alert(`조회 실패. [${err?.response?.status}/${err?.response?.data?.message}]`);
    });
  }, {
    id: 1,
  });
  return <View>{state.data && <Detail id={1} title={state.data.title} content={state.data.content} />}</View>;
}
