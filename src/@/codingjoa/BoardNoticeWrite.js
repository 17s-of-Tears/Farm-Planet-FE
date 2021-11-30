import * as ReactRouter from 'react-router-dom'
import { useInputRef, useInputRefHandlar } from './hook'
import { postBoardNotice } from './ajax'

export default function BoardNoticeWrite() {
  const history = ReactRouter.useHistory();
  const title = useInputRef('');
  const content = useInputRef('');
  const handleSubmit = useInputRefHandlar(payload => {
    postBoardNotice({
      title: payload.title,
      content: payload.content,
    }).then(() => {
      history.go(0);
    }, err => {
      alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`);
    });
  }, {
    title,
    content,
  });
  return (
    <div>
      <button onClick={handleSubmit}>글작성</button><br />
      <input ref={title}></input><br />
      <input ref={content}></input>
    </div>
  );
}
