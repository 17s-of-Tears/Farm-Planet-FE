import { useInputRef, useInputRefHandlar } from '@/codingjoa/hook'
import { postBoardFAQ, updateBoardFAQ, deleteBoardFAQ } from '@/codingjoa/ajax'

export default function Editor({
  id,
  payload,
  dispatch,
}) {
  const title = useInputRef(payload?.title ?? '');
  const question = useInputRef(payload?.question ?? '');
  const ask = useInputRef(payload?.ask ?? '');
  const handleSubmit = useInputRefHandlar(payload => {
    if(id > 0) {
      updateBoardFAQ({
        ...payload,
        id,
      }).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`수정 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    } else {
      postBoardFAQ(payload).then(
        () => dispatch({ type: 'refresh' }),
        err => alert(`작성 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
      );
    }

  }, {
    title,
    question,
    ask,
  });
  const handleDelete = id > 0 ? () => {
    deleteBoardFAQ({
      id,
    }).then(
      () => dispatch({ type: 'refresh' }),
      err => alert(`삭제 실패. [${err?.response?.status}/${err?.response?.data?.message}]`)
    );
  } : null;
  return (
    <div className="adminBoardNotice-Write">
      <div className="noticeForm">
        <h5>* 제목</h5>
          <input ref={title} type="text" className="noticeTitle"></input><br />
        <h5>* 질문</h5>
          <textarea ref={question} type="textarea" className="noticeText" rows="10"></textarea><br />
        <h5>* 답변</h5>
          <textarea ref={ask} type="textarea" className="noticeText" rows="10"></textarea><br />
        <div className="btnBox">
          <button onClick={() => dispatch({ type: 'refresh' })} className="cancelBtn">뒤로</button>
          {handleDelete && <button onClick={handleDelete} className="deleteBtn">삭제</button> }
          <button onClick={handleSubmit} className="submitBtn">글작성</button>

        </div>
      </div>
    </div>

  );
}
