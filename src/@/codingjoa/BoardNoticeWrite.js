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
    <div className="adminBoardNotice-Write">

      
      <div className="noticeForm">
        <h5>* 제목</h5>
          <input ref={title} type="text" className="noticeTitle"></input><br />
        <h5>* 내용</h5>
          <textarea ref={content} type="textarea" className="noticeText" rows="10"></textarea><br />
        <div className="btnBox">
          <button onClick={handleClick} className="cancelBtn">뒤로</button> 
          <button onClick={handleSubmit} className="submitBtn">글작성</button>                   
        </div>
        
      </div>
    </div>
  );
}
