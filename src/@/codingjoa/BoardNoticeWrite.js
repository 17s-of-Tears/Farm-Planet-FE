import * as ReactRouter from 'react-router-dom'
import { useInputRef, useInputRefHandlar } from './hook'
import { postBoardNotice } from './ajax'

export default function BoardNoticeWrite({
  setId,
}) {
  const handleClick = e => {
    e.preventDefault();
    setId(null);
  };
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
      <a href="#" onClick={handleClick}>뒤로</a>
      <div>
        <input ref={title}></input><br />
        <input ref={content}></input><br />
        <button onClick={handleSubmit}>글작성</button>
      </div>
    </div>
  );
}
